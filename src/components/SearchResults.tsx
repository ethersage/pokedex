import { useSelector } from 'react-redux';

import { SearchState } from '../store';
import { useMemo } from 'react';

export function SearchResults() {
  const search = useSelector((state: { search: SearchState }) => state.search);

  const name = search.result?.name || '';

  const upperName = useMemo(
    () =>
      name.length > 0 ? `${name[0].toUpperCase()}${name.substring(1)}` : '',
    [name]
  );

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
        <h2>{upperName}</h2>
        <img src={search.result.imageUrl} alt={upperName} />
      </>
    );
  }
}
