import { RECEIVE_SINGLE_POKEMON } from '../actions/pokemon_actions';
const itemsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    // case (RECEIVE_ALL_POKEMON):
    //   let newState = action.pokemon;
    //   return Object.assign({}, newState);
    case (RECEIVE_SINGLE_POKEMON):
      let newState = action.pokemon.items;
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}

export default itemsReducer;