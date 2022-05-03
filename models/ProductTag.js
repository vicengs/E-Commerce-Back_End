/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : productTag.js       */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/29/2022          */
/* ------------------------------ */
// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// Import our database connection from config.js
const sequelize = require("../config/connection");
// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}
// Set up fields and rules for ProductTag model
ProductTag.init({
    // Define id column
    id: {
        type:          DataTypes.INTEGER
       ,allowNull:     false
       ,primaryKey:    true
       ,autoIncrement: true
    },
    // Define product_id column (fk)
    product_id: {
        type:  DataTypes.INTEGER
       ,references: {
            model: "products"
           ,key:   "id"
        }
    },
    // Define tag_id column (fk)
    tag_id: {
        type:  DataTypes.INTEGER
       ,references: {
            model: "tags"
           ,key:   "id"
        }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    //underscored: true,
    modelName: "product_tag",
});
// Export module ProductTag
module.exports = ProductTag;
