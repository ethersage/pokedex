import { historyKey, searchSlice } from './search-slice'; // Adjust the import path
import { Pokemon } from './search-types';

describe('search reducer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle initial state', () => {
    expect(searchSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      error: '',
      history: [],
      result: null,
      status: 'idle',
      term: '',
    });

    expect(localStorage.getItem(historyKey)).toBeNull();
  });

  it('should handle startSearch', () => {
    const initialState = searchSlice.reducer(undefined, { type: 'unknown' });
    const state = searchSlice.reducer(
      initialState,
      searchSlice.actions.startSearch('pikachu')
    );
    expect(state).toEqual({
      ...initialState,
      status: 'loading',
      term: 'pikachu',
    });

    expect(localStorage.getItem(historyKey)).toEqual(null);
  });

  it('should handle fulfillSearch', () => {
    const mockPokemon: Pokemon = { name: 'pikachu', imageUrl: 'imageUrl' };

    const initialState = searchSlice.reducer(undefined, { type: 'unknown' });

    const state = searchSlice.reducer(
      { ...initialState, term: 'pikachu' },
      searchSlice.actions.fulfillSearch(mockPokemon)
    );

    expect(state).toEqual({
      ...initialState,
      history: ['pikachu'],
      result: mockPokemon,
      status: 'idle',
      term: 'pikachu',
    });

    expect(localStorage.getItem(historyKey)).toEqual('["pikachu"]');
  });

  it('should handle rejectSearch', () => {
    const initialState = searchSlice.reducer(undefined, { type: 'unknown' });

    const state = searchSlice.reducer(
      initialState,
      searchSlice.actions.rejectSearch('Error message')
    );

    expect(state).toEqual({
      ...initialState,
      status: 'error',
      error: 'Error message',
    });

    expect(localStorage.getItem(historyKey)).toEqual(null);
  });
});
