import { ChangeEvent, FormEvent, useState } from 'react';
import './SearchBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { SearchState, fetchPokemon } from '../store';
import { UnknownAction } from '@reduxjs/toolkit';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const search = useSelector((state: { search: SearchState }) => state.search);
  const dispatch = useDispatch();

  function onShowHistory() {
    if (searchTerm.trim() === '') {
      setShowHistory(true);
    }
  }

  function onTermChanged(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);

    setShowHistory(e.target.value === '');
  }

  function onInputActive() {
    onShowHistory();
  }

  function onInputBlur() {
    setTimeout(() => {
      setShowHistory(false);
    }, 0);
  }

  function onSearch() {
    const trimmed = searchTerm.trim();

    if (trimmed !== '') {
      // Unsure why I have to cast this and haven't had time to debug
      dispatch(fetchPokemon(trimmed.toLowerCase()) as unknown as UnknownAction);
      setSearchTerm('');
      setShowHistory(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSearch();
  }

  function onHistorySelected(term: string) {
    setSearchTerm(term);

    onSearch();
  }

  return (
    <div className="search-bar">
      <form onSubmit={onSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={onTermChanged}
          onFocus={onInputActive}
          onBlur={onInputBlur}
          onClick={onInputActive}
        />
      </form>
      {showHistory && (
        <ul className="search-history">
          {search.history.map((term) => (
            <li key={term} onClick={() => onHistorySelected(term)}>
              {term}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
