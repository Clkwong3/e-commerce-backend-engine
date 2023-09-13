// Import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// 'Product' belongsTo 'Category'
Product.belongsTo(Category, {
  foreignKey: `category_id`,
  // The 'Product' model contains a key (category_id) that links each product to a specific category.
});

// 'Category' hasMany 'Product'
Category.hasMany(Product, {
  foreignKey: `category_id`,
  // A single category can be associated with many products because of the 'category_id' foreign key in the 'Product' Model.
});

// 'Product' belongToMany 'Tag' (through 'ProductTag')
Product.belongsToMany(Tag, {
  through: ProductTag, // Establish the connection between products and tags (many-to-many relationship)
  foreignKey: `product_id`, // Link products to tags
  as: `tags`, // An alias 'tags' is used to access this association as 'tags' when querying
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: `tag_id`,
  as: `products`,
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
