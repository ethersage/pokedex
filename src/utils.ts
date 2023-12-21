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

export async function delayPromise<T>(promise: Promise<T>, delay = 300) {
  const wait = new Promise((resolve) => setTimeout(resolve, delay));

  const finished = await Promise.all([wait, promise]);

  return finished[1];
}
