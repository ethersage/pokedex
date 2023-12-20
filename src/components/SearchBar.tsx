import { ChangeEvent, FormEvent, useState } from 'react';
import './SearchBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { SearchState, fetchPokemon, store } from '../store';
import { UnknownAction } from '@reduxjs/toolkit';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const search = useSelector((state: { search: SearchState }) => state.search);
  const dispatch = useDispatch();

  function onTermChanged(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function onSearch(term: string) {
    const trimmed = term.trim();

    if (trimmed !== '') {
      // Unsure why I have to cast this and haven't had time to debug
      dispatch(fetchPokemon(trimmed.toLowerCase()) as unknown as UnknownAction);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSearch(searchTerm);
  }

  function onHistorySelected(term: string) {
    console.log('searching for', term);
    onSearch(term);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={onTermChanged}
        />
      </form>
      <ul>
        {search.history.map((term) => (
          <li key={term}>
            <a onClick={() => onHistorySelected(term)}>{term}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
