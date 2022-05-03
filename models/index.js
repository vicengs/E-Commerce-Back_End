/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : models/index.js     */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/28/2022          */
/* ------------------------------ */
// Import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");
// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: "category_id",
});
// Categories have many Products
Category.hasMany(Product, {
    foreignKey: "category_id"
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag
   ,as: "tags"
   ,foreignKey: "product_id"
});
/*ProductTag.belongsTo(Product, {
    foreignKey: 'product_id'
});
Product.hasMany(ProductTag, {
    foreignKey: 'product_id'
});*/
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag
   ,as: "products"
   ,foreignKey: "tag_id"
});
/*ProductTag.belongsTo(Tag, {
    foreignKey: 'tag_id'
});
Tag.hasMany(ProductTag, {
    foreignKey: 'tag_id'
});*/
// Export model relationships of Product, Category and Tag
module.exports = { Product, Category, Tag, ProductTag };