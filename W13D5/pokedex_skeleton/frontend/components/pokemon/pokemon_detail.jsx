import React from 'react';
import { Route, Link } from 'react-router-dom';
import ItemDetailContainer from './item_detail_container';

class PokemonDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT:");
    console.log(this.props);
    this.props.requestSinglePokemon(this.props.match.params.pokemonId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.pokemonId !== this.props.match.params.pokemonId) {
      this.props.requestSinglePokemon(this.props.match.params.pokemonId);
    }
  }

  render() {
    let stats = this.props.pokemon;
    console.log("############");
    console.log(this.props);
    
    let lis = [];
    lis.push(<li id="pokemon-name" key="0">{stats.name}</li>);
    lis.push(<li key="1">Type: {stats.poke_type}</li>);
    lis.push(<li key="2">Attack: {stats.attack}</li>);
    lis.push(<li key="3">Defense: {stats.defense}</li>);
    
    if (stats.moves){
      lis.push(<li key="4">Moves: {(stats.moves).join(', ')}</li>);
    }

    let itemList = this.props.items.map((item,idx) => {
      return (
        <li key={idx}><Link to={`/pokemon/${stats.id}/items/${idx+1}`}><img src={item.image_url} /></Link></li>
      )
    })
    
    return ( <div className="pokemon-detail-div">
      <ul className="pokemon-detail">
        <img className="pokemon-detail-image" src={this.props.pokemon.image_url} />
        {lis}
        
        <div className="items">
          <h3>Items</h3>
          <ul className="item-list">
            {itemList}
          </ul>
          <Route path="/pokemon/:pokemonId/items/:itemId" component={ItemDetailContainer} />
        </div>
        
      </ul>

        
      </div>
      // <Route path="/pokemon/:pokemonId/item/:itemId" component={ItemDetailContainer} />
    )
  }
}

export default PokemonDetail;