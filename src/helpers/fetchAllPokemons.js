import { pokemonAPI } from "../api/pokemonApi";

export const fetchAllPokemons = async () => {
  const resp = await pokemonAPI.get(`/pokemon?limit=1500`);
  const smallPokemonList = resp.data.results;

  return transformSmallPokemonIntoPokemon(smallPokemonList);
};

const transformSmallPokemonIntoPokemon = (smallPokemonList) => {
  const pokemonArr = smallPokemonList.map((poke) => {
    const pokeArr = poke.url.split("/");
    const id = pokeArr[6];
    const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return {
      id,
      name: poke.name,
      pic,
    };
  });

  //   console.log(pokemonArr);
  return pokemonArr;
};
