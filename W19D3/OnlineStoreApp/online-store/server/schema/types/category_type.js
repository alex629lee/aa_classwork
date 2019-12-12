const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;


const Category = mongoose.model("categories");
// const Product = mongoose.model("products");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(require("./product_type")),
      resolve(parentValue) {
        console.log(parentValue);
        return Category.getCategoryProducts(parentValue.id)

        // return Category.findById(parentValue.id)
          // .populate("products")
          // .then(category => category.products)
         
      }
    }
  })
});

module.exports = CategoryType;