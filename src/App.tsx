import { Provider as ReduxProvider } from 'react-redux';

import { store } from './store';
import { SearchBar } from './components/SearchBar';

import './App.css';
import { SearchResults } from './components/SearchResults';

export function App() {
  return (
    <ReduxProvider store={store}>
      <SearchBar />
      <SearchResults />
    </ReduxProvider>
  );
}
