// Import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Define associations between models to establish relationships in the database

// 'Product' belongs to 'Category'
// Each 'Product' belongs to a single 'Category'.
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// 'Category' has many 'Products'
// A single 'Category' can be associated with many 'Products' because of the 'category_id' foreign key in the 'Product' Model.
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE", // When a category is deleted, associated products are deleted.
});

// 'Product' belongToMany 'Tag' (through 'ProductTag')
// Establish a many-to-many relationship between 'Product' and 'Tag' models using the 'ProductTag' model as the bridge.
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
  as: "tags", // This is the alias for the 'Tag' association
  onDelete: "CASCADE", // When a product is deleted, associated product-tag relationships are deleted.
});

// 'Tags' belongToMany 'Products' (through 'ProductTag')
// Establish a many-to-many relationship between 'Tag' and 'Product' models using the 'ProductTag' model as the bridge.
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
  as: "products", // This is the alias for the 'Product' association
});

// Export the 'index' model
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
