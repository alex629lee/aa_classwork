import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_ABODE} = Mutations;

class AbodeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      coordinates: ""
    }
    this.update = this.update.bind(this);
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e, newAbode) {
    e.preventDefault();
    let name = this.state.name;

    newAbode({
      variables: {
        name: name,
        coordinates: this.state.coordinates
      }
    })

      .then(data => {
        console.log(data);
        this.setState({
          message: `New abode ${name} create successfully`,
          name: "",
          coordinates: ""
        });
      })
  }

  updateCache(cache, { data: { newAbode } }) {
    let abodes;
    try {
      abodes = cache.readQuery({ query: FETCH_ABODES });
    } catch (err) {
      return;
    }

    if (abodes) {
      let abodeArray = abodes.abodes;

      cache.writeQuery({
        query: FETCH_ABODES,
        data: { abodes: abodeArray.concat(newAbode) }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_ABODE}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newAbode, { data }) => {
          return (
            <div>
              {/* <h1>Create a New Abode</h1> */}
              <form onSubmit={e => this.handleSubmit(e, newAbode)}>
                <input
                  onChange={this.update("name")}
                  value={this.state.name}
                  placeholder="Name"
                />
                <input
                  onChange={this.update("coordinates")}
                  value={this.state.coordinates}
                  placeholder="Coordinates"
                />
                <button type="submit">Create Abode</button>
              </form>
              <p>{this.state.message}</p>
            </div>
          )
        }}
      </Mutation>
    );
  }
}

export default AbodeCreate;