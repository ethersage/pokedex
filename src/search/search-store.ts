import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { apiResponseToPokemon, PokemonApiResponse } from '../utils';
import { Pokemon } from './search-types';

export interface SearchState {
  error: string;
  history: string[];
  result: Pokemon | null;
  status: 'idle' | 'loading' | 'error';
  term: string;
}

const historyKey = 'search-history';
let history: string[] = [];

// get inital history from localstorage
try {
  const localHistory = localStorage.getItem(historyKey);
  history = localHistory === null ? [] : JSON.parse(localHistory);
} catch (error) {
  console.log(error);
  // do nothing, we just won't have search history
}

// Initial State
const initialState: SearchState = {
  error: '',
  history: history,
  status: 'idle',
  result: null,
  term: '',
};

type StartSearchAction = PayloadAction<string>;
type FulfillSearchAction = PayloadAction<Pokemon>;
type RejectSearchAction = PayloadAction<string>;

type SearchActions =
  | StartSearchAction
  | FulfillSearchAction
  | RejectSearchAction;

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearch: (state, action: StartSearchAction) => {
      state.status = 'loading';
      state.term = action.payload;
    },
    fulfillSearch: (state, action: FulfillSearchAction) => {
      state.status = 'idle';
      state.history = Array.from(new Set([state.term, ...state.history]));

      // persist to localStorage
      try {
        localStorage.setItem(historyKey, JSON.stringify(state.history));
      } catch (error) {
        console.error('Setting localStorage failed:', error);
        // do nothing, we simply won't set the item to storage
      }

      state.result = action.payload;
    },
    rejectSearch: (state, action: RejectSearchAction) => {
      state.error = action.payload;
      state.status = 'error';
    },
  },
});

export const fetchPokemon =
  (name: string): ThunkAction<void, SearchState, unknown, SearchActions> =>
  async (dispatch) => {
    dispatch(searchSlice.actions.startSearch(name));

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

      if (response.status !== 200) {
        dispatch(searchSlice.actions.rejectSearch('Not found'));
        return;
      }

      const pokemon = (await response.json()) as PokemonApiResponse;

      dispatch(
        searchSlice.actions.fulfillSearch(apiResponseToPokemon(pokemon))
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : (error as string);
      console.error(message);

      dispatch(
        searchSlice.actions.rejectSearch(
          'Oops. We encountered an error. Please try again.'
        )
      );
    }
  };
