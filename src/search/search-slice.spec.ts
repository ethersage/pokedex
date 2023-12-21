// import thunk from 'redux-thunk';
// import configureMockStore from 'redux-mock-store';

import { historyKey, searchSlice } from './search-slice'; // Adjust the import path
import { Pokemon } from './search-types';

const initialState = searchSlice.reducer(undefined, { type: 'unknown' });

describe('search reducer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle initial state', () => {
    expect(initialState).toEqual({
      error: '',
      history: [],
      result: null,
      status: 'idle',
      term: '',
    });

    expect(localStorage.getItem(historyKey)).toBeNull();
  });

  it('should handle startSearch', () => {
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
    const mockPokemonPikachu: Pokemon = {
      name: 'pikachu',
      imageUrl: 'imageUrl',
    };

    const mockPokemonCharmander: Pokemon = {
      name: 'charmander',
      imageUrl: 'imageUrl',
    };

    let state = searchSlice.reducer(
      { ...initialState, term: 'pikachu' },
      searchSlice.actions.fulfillSearch(mockPokemonPikachu)
    );

    expect(state).toEqual({
      ...initialState,
      history: ['pikachu'],
      result: mockPokemonPikachu,
      status: 'idle',
      term: 'pikachu',
    });

    expect(localStorage.getItem(historyKey)).toEqual('["pikachu"]');

    state = searchSlice.reducer(
      { ...state, term: 'charmander' },
      searchSlice.actions.fulfillSearch(mockPokemonCharmander)
    );

    expect(state).toEqual({
      ...state,
      history: ['charmander', 'pikachu'],
      result: mockPokemonCharmander,
      status: 'idle',
      term: 'charmander',
    });

    expect(localStorage.getItem(historyKey)).toEqual(
      '["charmander","pikachu"]'
    );
  });

  it('should handle rejectSearch', () => {
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

  //   it('creates fulfillSearch when fetching Pokemon is successful', async () => {
  //     // Mock the global fetch function
  //     global.fetch = jest.fn(() =>
  //       Promise.resolve({
  //         json: () => Promise.resolve({ name: 'pikachu' /* other properties */ }),
  //         status: 200,
  //       })
  //     );

  //     const store = configureMockStore({ search: initialState });

  //     await store.dispatch(fetchPokemon('pikachu'));

  //     const actions = store.getActions();
  //     expect(actions[0]).toEqual(searchSlice.actions.startSearch('pikachu'));
  //     expect(actions[1].type).toBe('search/fulfillSearch');
  //     expect(actions[1].payload).toEqual({
  //       name: 'pikachu' /* other properties */,
  //     });

  //     // Clean up
  //     global.fetch.mockClear();
  //     delete global.fetch;
  //   });
});
