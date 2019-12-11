import Mutations from "../../graphql/mutations";
import React from "react";
import { Mutation } from "react-apollo";
// we added the "react-icons" library to have access to a pencil icon for editting
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import { Query } from "react-apollo";
const { UPDATE_GOD_ABODE } = Mutations;
import Queries from "../../graphql/queries";


class AbodeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      abode: this.props.abode || "",
      selectedAbodeId: this.props.abode.id || null
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
  }

  updateSelection(e) {
    e.preventDefault();
    this.setState({selectedAbodeId: e.target.value});
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  render() {
    
    if (this.state.editing) {
      return (
        <Mutation mutation={UPDATE_GOD_ABODE}>
          {(updateGodAbode, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
            
                  updateGodAbode({
                    variables: { godId: this.props.id, abodeId: this.state.selectedAbodeId }
                  }).then(() => {
                    this.setState({ 
                    editing: false, abode: this.props.abode, selectedAbodeId: this.props.abode.id 
                  })});
                }}
              >
                <select onChange={this.updateSelection}> 
                  <option disabled selected>Select One</option>
                  <Query query={Queries.FETCH_ABODES}>
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>Error</p>;

                      return data.abodes.map(({ id, name }) => (
                        <option 
                          key={id} 
                          value={id} 
                        >
                          {name}
                        </option>
                      ))
                    }}
                  </Query>
                </select>
                <button type="submit">Update Abode</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <div
            onClick={this.handleEdit}
            style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
          >
            <IconContext.Provider value={{ className: "custom-icon" }}>
              <FaPencilAlt />
            </IconContext.Provider>
          </div>
          <h2>Abode: {this.state.abode.name}</h2>
        </div>
      );
    }
  }
}

export default AbodeDetail;