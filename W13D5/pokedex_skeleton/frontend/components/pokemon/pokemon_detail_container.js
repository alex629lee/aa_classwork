import { connect } from 'react-redux';
import { selectPokemonItems } from '../../reducers/selectors';
import { requestSinglePokemon } from '../../actions/pokemon_actions.js';
import PokemonDetail from './pokemon_detail.jsx';

const mapStateToProps = (state, ownProps) => {
  // piece of state that container subscribes to
  let poke = state.entities.pokemon[ownProps.match.params.pokemonId];
  // debugger;
  return {
    pokemon: poke,
    items: selectPokemonItems(state, poke)
  }
  
};

const mapDispatchToProps = dispatch => {
  return {
    requestSinglePokemon: (id) => dispatch(requestSinglePokemon(id))
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail);