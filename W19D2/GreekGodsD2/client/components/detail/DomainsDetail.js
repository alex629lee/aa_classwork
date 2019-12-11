import Mutations from "../../graphql/mutations";
import React from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
const { ADD_GOD_DOMAIN, REMOVE_GOD_DOMAIN } = Mutations;

class DomainsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetDomain: null,
      editing: false,
      editType: null,
      domains: this.props.domains || []
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.domainUpdate = this.domainUpdate.bind(this);
  }

  handleEdit(action) {
    return (e) => {
      e.preventDefault();
      this.setState({ editing: true, editType: action });
    }
  }

  domainUpdate(e) {
    this.setState({ targetDomain: e.target.value });
  }

  render() {
    let editForm = <div></div>;

    if (this.state.editType === "AddDomain") {
      editForm = (
        <Mutation mutation={ADD_GOD_DOMAIN}>
          {(addGodDomain, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addGodDomain({
                    variables: { godId: this.props.id, domain: this.state.targetDomain }
                  }).then(() => this.setState(
                    { 
                      editing: false, 
                      editType: null,
                      domains: this.props.domains,
                      targetDomain: null
                    }
                  ));
                }}
              >
                <input
                  value={this.state.domain}
                  onChange={this.domainUpdate}
                />
                <button type="submit">Add Domain</button>
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
          onClick={this.handleEdit("AddDomain")}
          style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
        >
          <IconContext.Provider value={{ className: "custom-icon" }}>
            <FaPencilAlt />
          </IconContext.Provider>
          <p>Add Domain</p>
        </div>
        <div
          onClick={this.handleEdit("RemoveDomain")}
          style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
        >
          <IconContext.Provider value={{ className: "custom-icon" }}>
            <FaPencilAlt />
          </IconContext.Provider>
          <p>Remove Domain</p>
        </div>



        <ul>
          <h3>Domains:</h3>
          {this.state.domains.map((domain, i) => (
            <li key={i}>
              {domain}
              <Mutation mutation={REMOVE_GOD_DOMAIN}>
                {(removeGodDomain, data) => (
                  <div>
                    <button onClick={e => {
                      removeGodDomain({
                        variables: { godId: this.props.id, domain: domain}
                      }).then(() => this.setState(
                        {
                          editing: false,
                          editType: null,
                          domains: this.props.domains,
                          targetDomain: null
                        }
                      ))
                    }}>
                      Remove Domain
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

export default DomainsDetail;
