import { Provider as ReduxProvider } from 'react-redux';

import { store } from './store';
import { SearchBar } from './components/SearchBar';

import './App.css';

export function App() {
  return (
    <ReduxProvider store={store}>
      <SearchBar />
    </ReduxProvider>
  );
}
