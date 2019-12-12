import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import {Link} from "react-router-dom";

const { FETCH_PRODUCTS } = Queries;

class ProductIndex extends React.Component {
  render () {
    return (
      <Query query={FETCH_PRODUCTS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <ul>
              {data.products.map(product => (
                <li key={product._id}><Link to={`/products/${product._id}`}>{product.name}</Link></li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}
export default ProductIndex;