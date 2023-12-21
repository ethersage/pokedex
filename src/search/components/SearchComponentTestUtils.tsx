import { ReactElement } from 'react';
import { Action, Store } from 'redux';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render } from '@testing-library/react';

import { SearchState } from '../search-slice';

const mockStore = configureMockStore<RootState, Action>();

interface RootState {
  search: SearchState;
}

function createMockStore(state: SearchState) {
  return mockStore({ search: state }) as unknown as Store<RootState, Action>;
}

export function renderWithStore(state: SearchState, component: ReactElement) {
  const store = createMockStore(state);
  render(<Provider store={store}>{component}</Provider>);
}
