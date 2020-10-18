import axios from "axios";

const PokedexAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemonList = (urlNext) => {
  return urlNext
    ? PokedexAPI.get(urlNext)
    : PokedexAPI.get(`/pokemon?offset=0&limit=12/`);
};

export const getPokemonInfo = (id) => PokedexAPI.get(`/pokemon/${id}/`);

export const getAllTypes = () => PokedexAPI.get("/type/?limit=999/");
