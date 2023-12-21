import { Pokemon } from './search/search-types';

export interface PokemonApiResponse {
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export function apiResponseToPokemon(apiResponse: PokemonApiResponse): Pokemon {
  return {
    name: apiResponse.name,
    imageUrl: apiResponse.sprites.other['official-artwork']['front_default'],
  };
}
