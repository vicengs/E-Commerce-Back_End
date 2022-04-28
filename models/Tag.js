/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : Tag.js              */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/28/2022          */
/* ------------------------------ */
// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// Import our database connection from config.js
const sequelize = require("../config/connection.js");
// Initialize Tag model (table) by extending off Sequelize's Model class
class Tag extends Model {}
// Set up fields and rules for Tag model
Tag.init({
    // Define id column
    id: {
      type:          DataTypes.INTEGER
     ,allowNull:     false
     ,primaryKey:    true
     ,autoIncrement: true
    },
    // Define tag_name column
    tagName: {
        type:      DataTypes.STRING
       ,allowNull: true
       ,field:     "tag_name"
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: "tag",
});
// Export module Tag
module.exports = Tag;