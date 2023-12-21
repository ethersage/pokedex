import { Provider as ReduxProvider } from 'react-redux';

import { store } from './store';
import { SearchBar } from './search/components/SearchBar';

import './App.css';
import { SearchResults } from './search/components/SearchResults';

export function App() {
  return (
    <ReduxProvider store={store}>
      <SearchBar />
      <SearchResults />
    </ReduxProvider>
  );
}
