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
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);
// Export the Category model
module.exports = Category;
