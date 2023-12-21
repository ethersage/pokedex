import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import { Action, Store } from 'redux';

import { SearchResults } from './SearchResults';
import { SearchState } from '../search-slice'; // Adjust import path as needed

const mockStore = configureMockStore<RootState, Action>();

interface RootState {
  search: SearchState;
}

function createMockStore(state: SearchState) {
  return mockStore({ search: state }) as unknown as Store<RootState, Action>;
}

function renderWithStore(store: Store<RootState, Action>) {
  render(
    <Provider store={store}>
      <SearchResults />
    </Provider>
  );
}

describe('SearchResults Component', () => {
  it('should display nothing when no results', () => {
    const initialState: SearchState = {
      error: '',
      history: [],
      result: null,
      status: 'idle',
      term: 'Pikachu',
    };

    const store = createMockStore(initialState);
    renderWithStore(store);

    expect(screen.queryByText('Pikachu')).toBeNull();
    expect(screen.queryByRole('loader')).toBeNull();
  });

  it('should display loading spinner when status is loading', () => {
    const initialState: SearchState = {
      error: '',
      history: [],
      result: null,
      status: 'loading',
      term: '',
    };

    const store = createMockStore(initialState);
    renderWithStore(store);

    expect(screen.getByRole('loader')).toHaveClass('spinner');
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

    const store = createMockStore(initialState);
    renderWithStore(store);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
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

    const store = createMockStore(initialState);
    renderWithStore(store);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Pikachu' })).toHaveAttribute(
      'src',
      mockResult.imageUrl
    );
  });
});
