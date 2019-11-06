import { connect } from 'react-redux';
import PokemonForm from './pokemon_form';
import { createPokemon } from '../../actions/pokemon_actions.js';



const mapDispatchToProps = (dispatch) => {
  return {
    createPokemon: (pokemon) => dispatch(createPokemon(pokemon))
  }
}


connect(mapDispatchToProps)(PokemonForm);