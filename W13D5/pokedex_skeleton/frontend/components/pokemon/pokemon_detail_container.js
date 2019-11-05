import { connect } from 'react-redux';
// import selectAllPokemon from '../../reducers/selectors';
import { requestSinglePokemon } from '../../actions/pokemon_actions.js';
import PokemonDetail from './pokemon_detail.jsx';

const mapStateToProps = state => {
  // piece of state that container subscribes to
  // pokemon: selectAllPokemon(state)
  console.log(state);
  console.log(this.props);
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