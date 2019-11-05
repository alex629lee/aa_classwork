import { RECEIVE_ALL_POKEMON, RECEIVE_SINGLE_POKEMON } from '../actions/pokemon_actions';

const pokemonReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case(RECEIVE_ALL_POKEMON):
      let newState = action.pokemon;
      return Object.assign({}, newState);
    case(RECEIVE_SINGLE_POKEMON):
      let newNewState = action.pokemon;
      return Object.assign({}, newNewState);
    default: 
      return state;
  }
}

export default pokemonReducer;


