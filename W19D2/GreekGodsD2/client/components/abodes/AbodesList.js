import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';
// import DeleteGod from "./DeleteGod";

const AbodesList = () => {
  return (
    <div className="outer">
      <ul>
        <Query query={Queries.FETCH_ABODES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>

            return data.abodes.map(({ id, name, coordinates }) => (
              <li key={id}>
                {/* <Link to={`/abodes/${id}`}> */}
                <h4>{name}</h4>
                {/* </Link> */}
              </li>
            ))
          }}
        </Query>
      </ul>
    </div>
  );
};

export default AbodesList;