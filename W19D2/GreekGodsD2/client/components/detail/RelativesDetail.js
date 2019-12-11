import Mutations from "../../graphql/mutations";
import React from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { REMOVE_GOD_RELATIVE, ADD_GOD_RELATIVE } = Mutations;

class RelativesDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parents: this.props.god.parents,
      siblings: this.props.god.siblings,
      children: this.props.god.children,
      editing: false,
      editType: null,
      selectedRelative: null,
      allRelatives: null
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditType = this.handleEditType.bind(this);
    this.handleAddRelative = this.handleAddRelative.bind(this);
  }

  handleEdit(e) {
    this.setState({editing: true})
  }

  handleEditType(e) {
    this.setState({editType: e.target.value});
  }

  handleAddRelative() {

  }

  render() {
    console.log("RELATIVES DETAIL");
    console.log(this.state);
    let editForm;
    let innerForm;
    let fetchType;

    if (this.state.editType) {
      if (this.state.editType === "parent") {
        fetchType = "FETCH_PARENTS";
      } else if (this.state.editType === "sibling") {
        fetchType = "FETCH_SIBLINGS";
      } else if (this.state.editType === "child") {
        fetchType = "FETCH_CHILDREN";
      }
      
      <Query query={Queries[fetchType]}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          console.log(data)
          return <div></div>;
      //     return data.emblems.map(({ id, name }) => (
      //       <option
      //         key={id}
      //         value={id}
      //       >
      //         {name}
      //       </option>
      //     ))
        }}
      </Query>
    }

    if (this.state.editType) {
      innerForm = (
        <Mutation mutation={ADD_GOD_RELATIVE}>
          {(addGodRelative, data) => (
            <div>
              {this.state.editType[0].toUpperCase() + this.state.editType.slice(1) + " Form"}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addGodRelative({
                    variables: { 
                      godId: this.props.id, 
                      relativeId: this.state.selectedRelative, 
                      relationship: this.state.editType 
                    }
                  }).then(() => this.setState(
                    {
                      editing: false,
                      editType: null,
                      selectedRelative: null
                    }
                  ));
                }}
              >
                {/* <select>

                </select> */}
                <button type="submit">Add {this.state.editType[0].toUpperCase() + this.state.editType.slice(1)}</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else if (this.state.editType === "sibling") {
      innerForm = (
        <form>
          Add Sibling:

        </form>
      );
    } else if (this.state.editType === "child") {
      innerForm = (
        <form>
          Add Child:

        </form>
      );
    }


    if (this.state.editing) {
      editForm = (
        <form>
          <div style={{display: "flex"}}>
            Choose Relationship Type: 
            <span style={{ color: "blue", margin: "0", marginLeft: "3px" }}>
              {this.state.editType}
            </span>
          </div>

          <select onChange={this.handleEditType}>
            <option selected disabled>Select a Relationship Type</option>
            <option value="parent">Parent</option>
            <option value="sibling">Sibling</option>
            <option value="child">Child</option>
          </select>

          { innerForm }
        </form>
      )
    }

    return (
      <div>
        <br /><br />
        <h3>Relatives</h3>

        {/* relationship: "parent", "child", or "sibling" */}

        <div>
          <h4>Parents:</h4>
          {
            this.state.parents.length > 0 ? (
              <ul>
                {this.state.parents.map(parent => (
                  <li>
                    {parent.name}
                    <Mutation mutation={REMOVE_GOD_RELATIVE}> 
                      {(removeGodRelative, data) => (
                        <div>
                          <button onClick={e => {
                            removeGodRelative({
                              variables: { 
                                godId: this.props.id, 
                                relativeId: parent.id,
                                relationship: "parent"
                              }
                            }).then(() => this.setState(
                              {
                                editing: false,
                                editType: null,
                                parents: this.props.god.parents,
                                siblings: this.props.god.siblings,
                                children: this.props.god.children,
                              }
                            ))
                          }}>
                            Remove Parent
                          </button>
                        </div>
                      )}
                    </Mutation>
                  </li> 
                ))}
              </ul>
            ) : (
              <div style={{ color: "gray" }}>none</div>
            )
          }
        </div>


        <div>
          <h4>Siblings:</h4>
          {
            this.state.siblings.length > 0 ? (
              <ul>
                {this.state.siblings.map(sibling => (
                  <li>
                    {sibling.name}
                    <Mutation mutation={REMOVE_GOD_RELATIVE}>
                      {(removeGodRelative, data) => (
                        <div>
                          <button onClick={e => {
                            removeGodRelative({
                              variables: {
                                godId: this.props.id,
                                relativeId: sibling.id,
                                relationship: "sibling"
                              }
                            }).then(() => this.setState(
                              {
                                editing: false,
                                editType: null,
                                parents: this.props.god.parents,
                                siblings: this.props.god.siblings,
                                children: this.props.god.children,
                              }
                            ))
                          }}>
                            Remove Sibling
                          </button>
                        </div>
                      )}
                    </Mutation>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ color: "gray" }}>none</div>
            ) 
          }
        </div>


        <div>
          <h4>Children:</h4>
          {
            this.state.children.length > 0 ? (
              <ul>
                {this.state.children.map( child => (
                  <li>
                    {child.name}
                    <Mutation mutation={REMOVE_GOD_RELATIVE}>
                      {(removeGodRelative, data) => (
                        <div>
                          <button onClick={e => {
                            removeGodRelative({
                              variables: {
                                godId: this.props.id,
                                relativeId: child.id,
                                relationship: "child"
                              }
                            }).then(() => this.setState(
                              {
                                editing: false,
                                editType: null,
                                parents: this.props.god.parents,
                                siblings: this.props.god.siblings,
                                children: this.props.god.children,
                              }
                            ))
                          }}>
                            Remove Child
                          </button>
                        </div>
                      )}
                    </Mutation>
                  </li> 
                ))}
              </ul>
            ) : (
              <div style={{color: "gray"}}>none</div>
            )
          }
        </div>
        
        <div
          onClick={this.handleEdit}
          style={{ fontSize: "10px", cursor: "pointer", display: "flex" }}
        >
          <IconContext.Provider value={{ className: "custom-icon" }}>
            <FaPencilAlt />
          </IconContext.Provider>
          <p style={{ fontSize: "14px", margin: "0", fontWeight: "bold" }}>Add Relative</p>
        </div>
        
        { editForm }
      </div>
    )
  }
}

export default RelativesDetail;