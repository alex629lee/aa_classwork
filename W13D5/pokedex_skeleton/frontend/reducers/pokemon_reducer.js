import { RECEIVE_ALL_POKEMON, RECEIVE_SINGLE_POKEMON, RECEIVE_NEW_POKEMON } from '../actions/pokemon_actions';

const pokemonReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case(RECEIVE_ALL_POKEMON):
      let newState = action.pokemon;
      return Object.assign({}, newState);
    case(RECEIVE_SINGLE_POKEMON):
      // debugger;
      let pokemonStats = action.pokemon.pokemon;
      return Object.assign({}, state, {[pokemonStats.id]: pokemonStats});
    case(RECEIVE_NEW_POKEMON): 
      let newPokemon = action.pokemon;
      return Object.assign({}, state, { [newPokemon.id]: newPokemon })
    default: 
      return state;
  }
}

export default pokemonReducer;


