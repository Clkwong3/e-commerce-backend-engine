// Import necessary modules
const { Model, DataTypes } = require("sequelize");

// Import model for reference
const sequelize = require("../config/connection.js");

// Initialize 'Tag' model (table) by extending off Sequelize's Model class
class Tag extends Model {}

// Set up fields and rules for 'Tag' model
Tag.init(
  {
    // Each tag is has a unique identifier and is automatically incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Must have value
      primaryKey: true, // Main identifier
      autoIncrement: true, // Auto-increment for each new entry
    },

    // Name of the tag that cannot be empty
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false, // Must have a name
      unique: true, // Checks if the 'tag_name' is unique, prevent duplicates
      validate: {
        len: [1, 50], // Limits the length to 1 - 50 characters
        isAlphanumeric: true, // Only alphanumeric characters are allowed
      },
    },
  },
  // Sequelize configuration options
  {
    sequelize,
    timestamps: false, // Disable the automatic timestamps (created_at, updated_at) columns
    freezeTableName: true, // Prevent Sequelize from changing the table name
    underscored: true, // Use underscores for column names (e.g., tag_name)
    modelName: "tag", // Model name in the database
  }
);

// Export the 'Tag' model
module.exports = Tag;
