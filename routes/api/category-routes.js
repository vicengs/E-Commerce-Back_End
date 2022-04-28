/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : category-routes.js  */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/28/2022          */
/* ------------------------------ */
const router = require("express").Router();
const { Category, Product } = require("../../models");
// GET /api/categories
router.get("/", (req, res) => {
    // Access our Category model and run .findAll() method)
    Category.findAll({
        //attributes: ["id", "category_name"],
        order: [["id"]]
       ,include: [
            {
                model: Product,
                attributes: ["id", "product_name", "price", "stock"]
            },
        ]
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
