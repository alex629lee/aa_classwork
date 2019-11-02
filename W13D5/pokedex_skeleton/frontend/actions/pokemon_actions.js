export const RECEIVE_ALL_POKEMON = "RECEIVE_ALL_POKEMON";
import * as APIUtil from '../util/api_util';

export const receiveAllPokemon = (pokemon) => ({
  type: RECEIVE_ALL_POKEMON,
  pokemon
});


