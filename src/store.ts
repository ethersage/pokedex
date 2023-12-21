import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { apiResponseToPokemon, PokemonApiResponse } from './utils';

export interface Pokemon {
  name: string;
  imageUrl: string;
}

export interface SearchState {
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
} catch (error) {}

// Initial State
const initialState: SearchState = {
  history: history,
  status: 'idle',
  result: null,
  term: '',
};

type StartSearchAction = PayloadAction<string>;
type FulfillSearchAction = PayloadAction<Pokemon>;
type RejectSearchAction = PayloadAction;

type SearchActions =
  | StartSearchAction
  | FulfillSearchAction
  | RejectSearchAction;

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearch: (state, action: StartSearchAction) => {
      state.status = 'loading';
      state.term = action.payload;
    },
    fulfillSearch: (state, action: FulfillSearchAction) => {
      state.status = 'idle';
      state.history = Array.from(new Set([...state.history, state.term]));

      // persist to localStorage
      try {
        localStorage.setItem(historyKey, JSON.stringify(state.history));
      } catch (error) {}

      state.result = action.payload;
    },
    rejectSearch: (state) => {
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
      const pokemon = (await response.json()) as PokemonApiResponse;
      dispatch(
        searchSlice.actions.fulfillSearch(apiResponseToPokemon(pokemon))
      );
    } catch (error) {
      console.log(error);
      dispatch(searchSlice.actions.rejectSearch());
    }
  };

// Configure the store
export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
  },
});
