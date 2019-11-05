import { connect } from 'react-redux';
import selectAllPokemon from '../../reducers/selectors';
import { requestAllPokemon } from '../../actions/pokemon_actions.js';
import PokemonIndex from './pokemon_index.jsx';

const mapStateToProps = state => ({
  // piece of state that container subscribes to
  pokemon: selectAllPokemon(state)
});

const mapDispatchToProps = dispatch => {
  return {
    requestAllPokemon: () => dispatch(requestAllPokemon())  // dispatch requestAllPokemon action.
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonIndex);