// Import necessary modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

// Define Category model by extending Sequelize Model
class Category extends Model {}

// Initialize Category model
Category.init(
  {
    // Each product is has a unique identifier and is automatically incremented
    id: {
      type: DataTypes.INTEGER, // 'id' column stores integer values
      allowNull: false, // 'id' cannot be null, must always have a value
      primaryKey: true, // Uniquely identifies each row
      autoIncrement: true, // 'id' should auto-increment with each new row added
    },

    // The name of the category, cannot be empty
    category_name: {
      type: DataTypes.STRING, // 'category_name' column stores string values
      allowNull: false, // 'category_name' cannot be null, must always have a value
      unique: true, // Checks if the 'category_name' is unique, prevent duplicates
      validate: {
        len: [1, 50], // Limits the length of the 'category_name' to 1 - 50 characters
      },
    },
  },
  // Sequelize configuration options
  {
    sequelize,
    timestamps: false, // Turn off the timestamp columns
    freezeTableName: true, // Prevent the table name from changing
    underscored: true, // Use underscores for column names
    modelName: "category", // Model name in the database
  }
);

// Export the 'Category' model
module.exports = Category;
