import Mutations from "../../graphql/mutations";
import React from "react";
import { Mutation } from "react-apollo";
// we added the "react-icons" library to have access to a pencil icon for editting
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
const { UPDATE_GOD_TYPE } = Mutations;

class TypeDetail extends React.Component {
  constructor(props) {
    super(props);

    // since we know we'll be receiving the god's name through props
    // we can set it in our state
    this.state = {
      editing: false,
      type: this.props.type || ""
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  // this is the function that will trigger "editing" mode
  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    // if we are editing we'll return a Mutation component
    if (this.state.editing) {
      return (
        <Mutation mutation={UPDATE_GOD_TYPE}>
          {(updateGodType, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateGodType({
                    variables: { id: this.props.id, type: this.state.type }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <input
                  value={this.state.type}
                  onChange={this.fieldUpdate("type")}
                />
                <button type="submit">Update Type</button>
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
          <h2>{this.state.type}</h2>
        </div>
      );
    }
  }
}

export default TypeDetail;