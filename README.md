[![CI](https://github.com/ethersage/pokedex/actions/workflows/ci.yml/badge.svg)](https://github.com/ethersage/pokedex/actions/workflows/ci.yml)

# Pokedex

## Running the project

First install:

```
npm install
```

Then run:

```
npm run dev
```

## Considerations

Where requirements are ambiguous, I use the following assumptions:

- To see the search history, focus the search text input.
- Only successful searches should be saved to history
- Search requires a specific Pokemon and returns one result that exacly matches that pokemon, as opposed to a list of pokemon whose names partially match the search term. This is because I didn't see a partial word search in the API provided.
- Running in a concurrent environment is not a consideration because this is a client-only SPA.
- History is stored in local storage, rather than managing server-persisted state. I didn't have time to setup a backend for that.
- The history dropdown is scrollable when it needs to be.
