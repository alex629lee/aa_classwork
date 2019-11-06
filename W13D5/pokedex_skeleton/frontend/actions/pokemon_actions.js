import * as APIUtil from '../util/api_util';

export const RECEIVE_ALL_POKEMON = "RECEIVE_ALL_POKEMON";
export const RECEIVE_SINGLE_POKEMON = "RECEIVE_SINGLE_POKEMON";
export const RECEIVE_NEW_POKEMON = "RECEIVE_NEW_POKEMON";

const receiveAllPokemon = (pokemon) => {
  return {
  type: RECEIVE_ALL_POKEMON,
  pokemon
  }
};

const receiveSinglePokemon = (pokemon) => {
  return {
    type: RECEIVE_SINGLE_POKEMON,
    pokemon
  }
};

const receiveNewPokemon = (pokemon) => {
  return {
    type: RECEIVE_NEW_POKEMON,
    pokemon
  }
}

export const requestAllPokemon = () => (dispatch) => {
  return APIUtil.fetchAllPokemon()
    .then(pokemon => dispatch(receiveAllPokemon(pokemon)))
};

export const requestSinglePokemon = (pokeId) => dispatch => {
  return APIUtil.fetchSinglePokemon(pokeId)
    .then(pokemon => dispatch(receiveSinglePokemon(pokemon)))
}

export const createPokemon = (pokemon) => dispatch => {
  return APIUtil.createPokemon(pokemon)
    .then((poke) => dispatch(receiveNewPokemon(poke)))
}
