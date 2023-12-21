import { configureStore } from '@reduxjs/toolkit';
import { searchSlice } from './search/search-store';

// Configure the store
export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
  },
});
