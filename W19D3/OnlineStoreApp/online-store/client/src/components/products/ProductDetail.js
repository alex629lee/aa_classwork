import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_PRODUCT } = Queries;

class ProductDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let productId = this.props.match.params.productId;
    return (
      <Query query={FETCH_PRODUCT} variables={{id: productId}}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <h1>{data.product.name}</h1>
              <ul>
                <li><p>{data.product.description}</p></li>
                <li>{data.product.weight}</li>
              </ul> 
            </div>
          );
        }}
      </Query> 
    )
  }
}

export default ProductDetail;