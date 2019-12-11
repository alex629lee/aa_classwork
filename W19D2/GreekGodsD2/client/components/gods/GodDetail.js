import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import NameDetail from "../detail/NameDetail";
import TypeDetail from "../detail/TypeDetail";
import DescriptionDetail from "../detail/DescriptionDetail";
import DomainsDetail from "../detail/DomainsDetail";
import AbodeDetail from "../detail/AbodeDetail";
import EmblemsDetail from "../detail/EmblemsDetail";
import RelativesDetail from "../detail/RelativesDetail";

const GodDetail = props => {
  return (
    // there we are getting the `id` for our query from React Router
    <Query query={Queries.FETCH_GOD} variables={{ id: props.match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        return (
          <div className="detail">
            <NameDetail id={data.god.id} name={data.god.name} />
            <TypeDetail id={data.god.id} type={data.god.type} />
            <DescriptionDetail id={data.god.id} description={data.god.description} />
            <DomainsDetail id={data.god.id} domains={data.god.domains} />
            <AbodeDetail id={data.god.id} abode={data.god.abode} />
            <EmblemsDetail id={data.god.id} emblems={data.god.emblems} />
            <RelativesDetail id={data.god.id} god={data.god} />
          </div>
        );
      }}
    </Query>
  );
}

export default GodDetail;