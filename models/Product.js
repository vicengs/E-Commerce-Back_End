/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : Product.js          */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/29/2022          */
/* ------------------------------ */
// Import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// Import our database connection from config.js
const sequelize = require("../config/connection");
// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}
// Set up fields and rules for Product model
Product.init({
    // Define id column
    id: {
        type:          DataTypes.INTEGER
       ,allowNull:     false
       ,primaryKey:    true
       ,autoIncrement: true
    },
    // Define product_name column
    product_name: {
        type:      DataTypes.STRING
       ,allowNull: false
    },
    // Define price column
    price: {
        type:      DataTypes.DECIMAL(10, 2)
       ,allowNull: false
       ,validate: {
            isDecimal: true
        }
    },
    // Define stock column
    stock: {
        type:         DataTypes.INTEGER
       ,allowNull:    false
       ,defaultValue: 10
       ,validate: {
            isInt: true
        }
    },
    // Define category_id column (fk)
    category_id: {
        type:  DataTypes.INTEGER
       ,references: {
            model: "categories"
           ,key:   "id"
        }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: false,
    //underscored: true,
    modelName: "product",
});
// Export module Product
module.exports = Product;