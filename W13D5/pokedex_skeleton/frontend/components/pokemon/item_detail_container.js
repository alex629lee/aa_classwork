import { connect } from 'react-redux';
import ItemDetail from './item_detail.jsx';
import { selectPokemonItem } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  let itemId = ownProps.match.params.itemId;
  return {
    // items: state.entities.items,
    item: selectPokemonItem(state, itemId)
  }
}



export default connect(mapStateToProps)(ItemDetail);