import { ChangeEvent, FormEvent, useState } from 'react';
import './SearchBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { SearchState, fetchPokemon, store } from '../store';
import { UnknownAction } from '@reduxjs/toolkit';

export function SearchBar() {
  const [term, setTerm] = useState('');
  const search = useSelector((state: { search: SearchState }) => state.search);
  const dispatch = useDispatch();

  function onTermChanged(e: ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
  }

  function onSearch(t: string) {
    const trimmed = t.trim();

    if (trimmed !== '') {
      // Unsure why I have to cast this and haven't had time to debug
      dispatch(fetchPokemon(trimmed.toLowerCase()) as unknown as UnknownAction);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSearch(term);
  }

  function onHistorySelected(t: string) {
    console.log('searching for', t);
    onSearch(t);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search Pokémon"
          value={term}
          onChange={onTermChanged}
        />
      </form>
      <ul>
        {search.history.map((t) => (
          <li key={t}>
            <a onClick={() => onHistorySelected(t)}>{t}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
