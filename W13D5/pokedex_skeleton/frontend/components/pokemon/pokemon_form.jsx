import React from 'react';

class PokemonForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      
    };
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }



  render() {

  }
}

export default PokemonForm;