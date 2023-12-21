import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SearchBar } from './SearchBar';
import { SearchState } from '../search-slice'; // Adjust import path as needed
import { renderWithStore } from './SearchComponentTestUtils';
import { act } from 'react-dom/test-utils';

it('should display no history when input not focused', () => {
  const initialState: SearchState = {
    error: '',
    history: [],
    result: null,
    status: 'idle',
    term: '',
  };

  renderWithStore(initialState, <SearchBar />);

  expect(screen.queryByRole('history')).toBeNull();
});

it('should display history when input focused and there is history', () => {
  const initialState: SearchState = {
    error: '',
    history: ['pikachu'],
    result: null,
    status: 'idle',
    term: '',
  };

  renderWithStore(initialState, <SearchBar />);

  const searchInput = screen.getByRole('search');
  act(() => searchInput.focus());

  expect(screen.getByRole('history')).toBeInTheDocument();
  expect(screen.getByText('pikachu')).toBeInTheDocument();
});

it('should not display history when input focused and there is no history', () => {
  const initialState: SearchState = {
    error: '',
    history: [],
    result: null,
    status: 'idle',
    term: '',
  };

  renderWithStore(initialState, <SearchBar />);

  const searchInput = screen.getByRole('search');
  act(() => searchInput.focus());

  expect(screen.queryByRole('history')).toBeNull();
});
