import { useSelector } from 'react-redux';

import { SearchState } from '../store';

export function SearchResults() {
  const search = useSelector((state: { search: SearchState }) => state.search);

  if (search.status === 'error') {
    // There could be other errors here, but we haven't accounted for that
    return 'Not found';
  }

  if (search.status === 'loading') {
    return 'loading';
  }

  if (search.status === 'idle' && search.result !== null) {
    return (
      <>
        <h2>{search.result.name}</h2>
        <img src={search.result.imageUrl} alt={search.result.name} />
      </>
    );
  }
}
