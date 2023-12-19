import { createSlice, configureStore } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    history: new Set(),
    isLoading: false,
    results: [],
    term: '',
  },
  reducers: {
    load: (state, action) => {
      const term = action.payload.term;

      state.isLoading = true;
      state.term = term;
      state.history.add(term);
    },
    loaded: (state) => {
      // fetch here

      state.isLoading = false;
    },
  },
});

export const { load, loaded } = searchSlice.actions;

export const store = configureStore({
  reducer: searchSlice.reducer,
});
