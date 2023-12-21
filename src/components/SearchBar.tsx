import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import './SearchBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { SearchState, fetchPokemon } from '../store';
import { UnknownAction } from '@reduxjs/toolkit';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const historyRef = useRef<HTMLUListElement | null>(null);

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
      if (document.activeElement !== historyRef.current) {
        setShowHistory(false);
      }
    }, 0);
  }

  function onSearch(term: string = '') {
    const trimmed = term.trim();

    if (trimmed !== '') {
      // Unsure why I have to cast this and haven't had time to debug
      dispatch(fetchPokemon(trimmed.toLowerCase()) as unknown as UnknownAction);
      setSearchTerm('');
      setShowHistory(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSearch(inputRef.current?.value);
  }

  function onHistorySelected(term: string) {
    onSearch(term);
  }

  return (
    <div className="search-bar">
      <form className="search-form" onSubmit={onSubmit}>
        <input
          className="search-input"
          tabIndex={0}
          ref={inputRef}
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={onTermChanged}
          onFocus={onInputActive}
          onBlur={onInputBlur}
          onClick={onInputActive}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {showHistory && (
        <ul className="search-history" tabIndex={1} ref={historyRef}>
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
