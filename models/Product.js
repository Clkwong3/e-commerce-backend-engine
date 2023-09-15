// Import necessary modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

// Initialize 'Product' model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for 'Product' model
Product.init(
  {
    // Each product is has a unique identifier and is automatically incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Must have value
      primaryKey: true, // Main identifier
      autoIncrement: true, // Auto-increment for each new entry
    },

    // Name of the product that cannot be empty
    product_name: {
      type: DataTypes.STRING,
      allowNull: false, // Must have a name
      unique: true, // Checks if the 'product_name' is unique, prevent duplicates
      validate: {
        len: [1, 200], // Limits the length of the 'product_name' to 1 - 200 characters
      },
    },

    // Price of the product with 2 decimal places
    price: {
      type: DataTypes.DECIMAL(10, 2), // Allows up to '10' digits with '2' decimal places
      allowNull: false, // Must have value
      validate: {
        isDecimal: true, // Check if the number is a decimal
        min: 0, // Check if it is a positive number
      },
    },

    // Number of items in stock that defaults to '10' if not specified
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false, // Must have a value
      defaultValue: 10, // Default value if not provided
      validate: {
        isInt: true, // Check if it is an integer
        min: 0, // Check if it is a positive number
      },
    },

    // Category where the product belongs to
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category", // Referring to the 'Category' model
        key: "id", // Referring to the 'id' column in the 'Category' model
      },
      validate: {
        async isExist(value) {
          // Check if the 'category_id' exists in the 'Category' model
          const category = await Category.findByPk(value);
          // If nothing is found, throw an error
          if (!category) {
            throw new Error("Category does not exist.");
          }
        },
      },
    },
  },
  // Sequelize configuration options
  {
    sequelize,
    timestamps: false, // Do not include timestamp columns
    freezeTableName: true, // Cannot change the table name
    underscored: true, // Use underscores for column names
    modelName: "product", // Model name in the database
  }
);

// Export the 'Product' model
module.exports = Product;
