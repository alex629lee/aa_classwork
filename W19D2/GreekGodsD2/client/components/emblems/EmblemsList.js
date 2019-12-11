import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';
// import DeleteGod from "./DeleteGod";

const EmblemsList = () => {
  return (
    <div className="outer">
      <ul>
        <Query query={Queries.FETCH_EMBLEMS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>
            if (data) console.log(data.emblems);
            return data.emblems.map(({ id, name }) => (
              <li key={id}>
                {/* <Link to={`/emblems/${id}`}> */}
                  <h4>{name}</h4>
                {/* </Link> */}
                {/* <DeleteGod id={id} /> */}
              </li>
            ))
          }}
        </Query>
      </ul>
    </div>
  );
};

export default EmblemsList;