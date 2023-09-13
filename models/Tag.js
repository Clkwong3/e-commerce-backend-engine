const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Tag extends Model {}

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
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

module.exports = Tag;
