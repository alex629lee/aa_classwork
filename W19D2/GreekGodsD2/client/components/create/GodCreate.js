import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_GOD } = Mutations;

class GodCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      type: "god"
    }
    this.update = this.update.bind(this);
  }

  update(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  handleSubmit(e, newGod) {
    e.preventDefault();
    let name = this.state.name;

    newGod({
      variables: {
        name: name, 
        type: this.state.type, 
        description: this.state.description
      }
    })

    .then(data => {
      console.log(data);
      this.setState({
        message: `New god ${name} create successfully`,
        name: "",
        type: "god",
        description: ""
      });
    })
  }

  updateCache(cache, { data: { newGod } }) {
    let gods;
    try {
      gods = cache.readQuery({ query: FETCH_GODS });
    } catch (err) {
      return;
    }

    if (gods) {
      let godArray = gods.gods;

      cache.writeQuery({
        query: FETCH_GODS,
        data: { gods: godArray.concat(newGod) }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_GOD}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newGod, {data}) => {
          return (
            <div>
              <form onSubmit={e => this.handleSubmit(e, newGod)}>
                <input
                  onChange={this.update("name")}
                  value={this.state.name}
                  placeholder="Name"
                />
                <select value={this.state.type} onChange={this.update("type")}>
                  <option value="god">God</option>
                  <option value="goddess">Goddess</option>
                </select>
                <textarea
                  value={this.state.description}
                  onChange={this.update("description")}
                  placeholder="description"
                />
                <button type="submit">Create God</button>
              </form>
              <p>{this.state.message}</p>
            </div>
          )
         }}
      </Mutation>
    );
  }
}

export default GodCreate;