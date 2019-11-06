export const selectAllPokemon = (state) => {
  return Object.values(state.entities.pokemon);
}

export const selectPokemonItems = (state, pokemon) => {
  if (pokemon && pokemon.item_ids) {
    return pokemon.item_ids.map(id => state.entities.items[id]);
  } else {
    return [];
  }
}

export const selectPokemonItem = (state, itemId) => {
  if (itemId) {
    return state.entities.items[itemId];
  } else {
    return {};
  }
}
