import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

interface Pokemon {} // Define the Pokemon interface as per your requirement

// Define the state type
interface SearchState {
  history: Set<string>;
  results: Pokemon[];
  status: 'idle' | 'loading' | 'error';
  term: string;
}

// Initial State
const initialState: SearchState = {
  history: new Set(),
  status: 'idle',
  results: [],
  term: '',
};

type StartSearchAction = PayloadAction<string>;
type FulfillSearchAction = PayloadAction<Pokemon[]>;
type RejectSearchAction = PayloadAction;

type SearchActions =
  | StartSearchAction
  | FulfillSearchAction
  | RejectSearchAction;

// Create a slice for search functionality
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
      state.history.add(state.term);
      state.results = action.payload;
    },
    rejectSearch: (state) => {
      state.status = 'error';
    },
  },
});

const fetchPokemon =
  (name: string): ThunkAction<void, SearchState, null, SearchActions> =>
  async (dispatch) => {
    dispatch(searchSlice.actions.startSearch(name));
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemon = await response.json();
      dispatch(searchSlice.actions.fulfillSearch(pokemon));
    } catch (error) {
      dispatch(searchSlice.actions.rejectSearch());
    }
  };

// Configure the store
const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
  },
});

export { fetchPokemon };
export default store;
