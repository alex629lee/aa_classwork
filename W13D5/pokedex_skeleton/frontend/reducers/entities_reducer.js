import { combineReducers } from 'redux';
import pokemonReducer from './pokemon_reducer.js';

const entitiesReducer = combineReducers({
  pokemon: pokemonReducer
})

export default entitiesReducer;
