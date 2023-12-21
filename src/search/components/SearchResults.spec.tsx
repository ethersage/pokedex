import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SearchResults } from './SearchResults';
import { SearchState } from '../search-slice'; // Adjust import path as needed
import { renderWithStore } from './SearchComponentTestUtils';

describe('SearchResults Component', () => {
  it('should display nothing when no results', () => {
    const initialState: SearchState = {
      error: '',
      history: [],
      result: null,
      status: 'idle',
      term: 'Pikachu',
    };

    renderWithStore(initialState, <SearchResults />);

    expect(screen.queryByText('Pikachu')).toBeNull();
    expect(screen.queryByRole('loader')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('should display loading spinner when status is loading', () => {
    const initialState: SearchState = {
      error: '',
      history: [],
      result: null,
      status: 'loading',
      term: '',
    };

    renderWithStore(initialState, <SearchResults />);

    expect(screen.getByRole('loader')).toHaveClass('spinner');
    expect(screen.queryByText('Pikachu')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('should display error message when status is error', () => {
    const errorMessage = 'Error occurred';
    const initialState: SearchState = {
      status: 'error',
      result: null,
      error: errorMessage,
      history: [],
      term: 'pikachu',
    };

    renderWithStore(initialState, <SearchResults />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText('Pikachu')).toBeNull();
    expect(screen.queryByRole('loader')).toBeNull();
  });

  it('should display search results when status is idle and result is not null', () => {
    const mockResult = { name: 'pikachu', imageUrl: 'path/to/image' };
    const initialState: SearchState = {
      status: 'idle',
      result: mockResult,
      error: '',
      history: [],
      term: '',
    };

    renderWithStore(initialState, <SearchResults />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Pikachu' })).toHaveAttribute(
      'src',
      mockResult.imageUrl
    );
    expect(screen.queryByRole('loader')).toBeNull();
  });
});
