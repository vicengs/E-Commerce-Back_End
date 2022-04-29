/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : category-routes.js  */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/28/2022          */
/* ------------------------------ */
// Add router express module to use
const router = require("express").Router();
// Include Category and Product models to use
const { Category, Product } = require("../../models");
// GET /api/categories
router.get("/", (req, res) => {
    // Access our Category model to get all categories
    Category.findAll({
        order: ["id"]
        // JOIN to Product to get its fields
       ,include: [
            { model: Product }
        ]
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// GET /api/categories/id
router.get("/:id", (req, res) => {
    // Access our Category model to get category by id
    Category.findOne({
        where: { id: req.params.id }
        // JOIN to Product to get its fields
       ,include: [
            { model: Product }
        ]
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// POST /api/categories
router.post("/", (req, res) => {
    // Create a category into Category model
    Category.create(
        { category_name: req.body.category_name }
    )
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// PUT /api/categories/id
router.put("/:id", (req, res) => {
    // Update a category name by id
    Category.update(
        { category_name: req.body.category_name }
       ,{ where: { id: req.params.id } }
    )
    .then(dbCategoryData => {
        if (!dbCategoryData[0]) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// DEL /api/categories/id
router.delete("/:id", (req, res) => {
    // Delete a category name by id
    Category.destroy(
        { where: { id: req.params.id } }
    )
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;
