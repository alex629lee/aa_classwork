const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLFloat } = graphql;

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLID },
    description: { type: GraphQLString },
    weight: { type: GraphQLInt },
    price: { type: GraphQLFloat }
  })
});

module.exports = ProductType;