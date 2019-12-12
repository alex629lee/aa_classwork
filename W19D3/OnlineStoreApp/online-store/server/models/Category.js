const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "products" 
    }
  ]
});

CategorySchema.statics.getCategoryProducts = (categoryId) => {
  const Category = mongoose.model("categories");
  return Category.findById(categoryId)
    .populate("products")
    .then(category => category.products)
};


module.exports = mongoose.model("categories", CategorySchema);