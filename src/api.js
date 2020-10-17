import axios from "axios";

const PokedexAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemonList = (offset = 0) =>
  PokedexAPI.get(`/pokemon?offset=${offset}&limit=12/`);

export const getPokemonInfo = (id) => PokedexAPI.get(`/pokemon/${id}/`);

export const getAllTypes = () => PokedexAPI.get("/type/?limit=999/");
