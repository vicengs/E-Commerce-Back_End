/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : Category.js         */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/28/2022          */
/* ------------------------------ */
// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// Import our database connection from config.js
const sequelize = require("../config/connection.js");
// Initialize Category model (table) by extending off Sequelize's Model class
class Category extends Model {}
// Set up fields and rules for Category model
Category.init({
    // Define id column
    id: {
        type:          DataTypes.INTEGER
       ,allowNull:     false
       ,primaryKey:    true
       ,autoIncrement: true
    },
    // Define category_name column
    categoryName: {
        type:      DataTypes.STRING
       ,allowNull: false
       ,field:     "category_name"
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: "category",
});
// Export module Category
module.exports = Category;