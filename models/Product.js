// import important parts of sequelize library
const { Model, DataTypes, DECIMAL } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
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
    },
    // Price of the product with 2 decimal places
    price: {
      type: DataTypes.DECIMAL(10, 2), // Allows up to '10' digits with '2' decimal places
      allowNull: false,
    },
    // Number of items in stock that defaults to '10' if not specified
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false, // Must have a value
      defaultValue: 10, // Default value if not provided
    },
    // Category where the product belongs to
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category", // Referring to the 'category' model
        key: "id", // Referromg tp the 'id' column in the 'category' model
      },
    },
  },
  {
    sequelize,
    timestamps: false, // Do not include timestamp columns
    freezeTableName: true, // Prevent sequelize from changing the table name
    underscored: true, // Use underscores for column names
    modelName: "product", // Model name in the database
  }
);

module.exports = Product;
