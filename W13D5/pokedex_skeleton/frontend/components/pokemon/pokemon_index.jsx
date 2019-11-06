import React from 'react';
import PokemonIndexItem from './pokemon_index_item';
import { Route } from 'react-router-dom';
import PokemonDetailContainer from './pokemon_detail_container';

class PokemonIndex extends React.Component {

  constructor(props){
    super(props);
    // this.state = {
    //   loading: true
    // }
  }

  componentDidMount() {
    console.log(this.props.requestAllPokemon());
    this.props.requestAllPokemon()
      // .then(() => this.setState(loading: false));
  }

  render(){
    
    const pokemon = this.props.pokemon.map((poke, idx) => {
      return (
        <PokemonIndexItem key={poke.id} pokemon={poke} />
      );
    });

    // if (this.state.loading) {
    //   return null;
    // }
    // if (pokemon.length === 0) {
    //   return null;
    // }

    return (
      <section className="pokedex">
        
        <ul className="pokemon-list">
          { pokemon }
        </ul>
        <Route path="/pokemon/:pokemonId" component={PokemonDetailContainer} />
      </section>
    );
  }

}


export default PokemonIndex;