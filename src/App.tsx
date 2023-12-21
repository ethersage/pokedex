import { Provider as ReduxProvider } from 'react-redux';

import { store } from './store';
import { SearchBar } from './search/components/SearchBar';
import { SearchResults } from './search/components/SearchResults';

import './App.css';

export function App() {
  return (
    <ReduxProvider store={store}>
      <SearchBar />
      <SearchResults />
    </ReduxProvider>
  );
}
