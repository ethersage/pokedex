import { useSelector } from 'react-redux';

import { SearchState } from '../search-slice';
import { useMemo } from 'react';

import './SearchResults.css';

export function SearchResults() {
  const search = useSelector((state: { search: SearchState }) => state.search);

  const name = search.result?.name || '';

  // Perhaps overkill to use useMemo for this
  const properName = useMemo(
    () =>
      name.length > 0 ? `${name[0].toUpperCase()}${name.substring(1)}` : '',
    [name]
  );

  if (search.status === 'error') {
    return (
      <div role="search-results" className="search-results">
        {search.error}
      </div>
    );
  }

  if (search.status === 'loading') {
    return (
      <div className="search-results-loading">
        <div role="loader" className="spinner" />
      </div>
    );
  }

  if (search.status === 'idle' && search.result !== null) {
    return (
      <div role="search-results" className="search-results">
        <h2>{properName}</h2>
        <img src={search.result.imageUrl} alt={properName} />
      </div>
    );
  }
}
