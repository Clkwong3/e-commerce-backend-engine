// Import necessary modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

// Import models for reference
const Product = require("./Product");
const Tag = require("./Tag");

// Initialize 'ProductTag' model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// Set up fields and rules for 'Tag' model
ProductTag.init(
  {
    // Each product is has a unique identifier and is automatically incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Cannot be empty
      primaryKey: true, // Main identifier
      autoIncrement: true, // Auto-increment for new entries
    },

    // Referring to a product in the 'Product' model
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product", // Referring to the 'Product' model
        key: "id", // Referring to the 'id' column in the 'Product' model
      },
      validate: {
        async isExist(value) {
          // Check if the 'product_id' exists in the 'Product' model
          const product = await Product.findByPk(value);
          // If no matching product is found, throw an error
          if (!product) {
            throw new Error("Product does not exist.");
          }
        },
      },
    },

    // Referring to a tag in the 'Tag' model
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag", // Referring to the 'Tag' model
        key: "id", // Referring to the 'id' column in the 'Tag' model
      },
      validate: {
        async isExist(value) {
          // Check if the 'tag_id' exists in the 'Tag' model
          const tag = await Tag.findByPk(value);
          // If no matching tag is found, throw an error
          if (!tag) {
            throw new Error("Tag does not exist.");
          }
        },
      },
    },
  },
  // Sequelize configuration options
  {
    sequelize,
    timestamps: false, // Exclude timestamp columns
    freezeTableName: true, // Prevent table name modification by Sequelize
    underscored: true, // Use underscores for column names
    modelName: "product_tag", // Model name in the database
  }
);

// Export the 'ProductTag' model
module.exports = ProductTag;
