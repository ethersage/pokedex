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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const t = term.trim();

    if (t !== '') {
      // Unsure why I have to cast this and haven't had time to debug
      dispatch(fetchPokemon(t.toLowerCase()) as unknown as UnknownAction);
    }
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
          <li>{t}</li>
        ))}
      </ul>
    </>
  );
}
