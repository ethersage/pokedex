import { ChangeEvent, FormEvent, KeyboardEventHandler, useState } from 'react';
import './SearchBar.css';
import { useDispatch } from 'react-redux';
import { fetchPokemon, store } from '../store';
import { UnknownAction } from '@reduxjs/toolkit';

export function SearchBar() {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch<typeof store.dispatch>();

  function onTermChanged(e: ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const t = term.trim();

    if (t !== '') {
      dispatch(fetchPokemon(t.toLowerCase()) as unknown as UnknownAction);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search Pokémon"
        value={term}
        onChange={onTermChanged}
      />
    </form>
  );
}
