import Mutations from "../../graphql/mutations";
import React from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
const { ADD_GOD_EMBLEM, REMOVE_GOD_EMBLEM } = Mutations;
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";

class EmblemsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetEmblemId: null,
      editing: false,
      editType: null,
      emblems: this.props.emblems || []
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.emblemUpdate = this.emblemUpdate.bind(this);
  }

  handleEdit(action) {
    return (e) => {
      e.preventDefault();
      this.setState({ editing: true, editType: action });
    }
  }

  emblemUpdate(e) {
    this.setState({ targetEmblemId: e.target.value });
  }

  render() {
    console.log(this.state.emblems);
    let allEmblems = Object.values(this.state.emblems);
    let editForm = <div></div>;

    if (this.state.editType === "AddEmblem") {
      editForm = (
        <Mutation mutation={ADD_GOD_EMBLEM}>
          {(addGodEmblem, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addGodEmblem({
                    variables: { godId: this.props.id, emblemId: this.state.targetEmblemId }
                  }).then(() => this.setState(
                    { 
                      editing: false, 
                      editType: null,
                      emblems: this.props.emblems,
                      targetEmblemId: null
                    }
                  ));
                }}
              >
                <select onChange={this.emblemUpdate}>
                  <option disabled selected>Select One</option>
                  <Query query={Queries.FETCH_EMBLEMS} allEmblems={allEmblems}>
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>Error</p>;
                      console.log(data.emblems);
                      return data.emblems.map((emblem,i) => {
                        { if (allEmblems.indexOf(emblem.id) > -1) {
                        return (<option
                          key={ emblem.id }
                          value={ emblem.id }
                        >
                          { emblem.name }
                        </option>)
                        } else {
                          return <div></div>
                        }}
                        } 
                      )
                    }}
                  </Query>
                </select>
                <button type="submit">Add Emblem</button>
              </form>
            </div>
          )}
        </Mutation>
      )
    } 
    
    return (
      <div>
        { editForm }

        <div
          onClick={this.handleEdit("AddEmblem")}
          style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
        >
          <IconContext.Provider value={{ className: "custom-icon" }}>
            <FaPencilAlt />
          </IconContext.Provider>
          <p>Add Emblem</p>
        </div>
        <div
          onClick={this.handleEdit("RemoveEmblem")}
          style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
        >
          <IconContext.Provider value={{ className: "custom-icon" }}>
            <FaPencilAlt />
          </IconContext.Provider>
          <p>Remove Emblem</p>
        </div>

        <ul>
          <h3>Emblems:</h3>
          {this.state.emblems.map((emblem, i) => (
            <li key={i}>
              {emblem.name}
              <Mutation mutation={REMOVE_GOD_EMBLEM}>
                {(removeGodEmblem, data) => (
                  <div>
                    <button onClick={e => {
                      removeGodEmblem({
                        variables: { godId: this.props.id, emblemId: emblem.id}
                      }).then(() => this.setState(
                        {
                          editing: false,
                          editType: null,
                          emblems: this.props.emblems,
                          targetEmblemId: null
                        }
                      ))
                    }}>
                      Remove Emblem
                    </button>
                  </div>
                )}
              </Mutation>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EmblemsDetail;
