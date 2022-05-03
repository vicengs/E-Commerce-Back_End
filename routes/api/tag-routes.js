/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : tag-routes.js       */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/30/2022          */
/* ------------------------------ */
// Add router express module to use
const router = require("express").Router();
// Include Tag, Product and transactional model to use
const { Tag, Product, ProductTag, Category } = require("../../models");
// GET /api/tags
router.get("/", (req, res) => {
    // Access our Category model to get all categories
    Tag.findAll({
        order: ["id"]
        // JOIN to Product through ProductTag to get its fields
       ,include: [
            { model: Product
             ,through: ProductTag
             ,as: "products"
            }
        ]
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// GET /api/tags/id
router.get("/:id", (req, res) => {
    // Access our Tag model to get tag by id
    Tag.findOne({
        where: { id: req.params.id }
        // JOIN to Product through ProductTag to get its fields
       ,include: [
            { model: Product
             ,through: ProductTag
             ,as: "products"
            }
        ]
    })
    .then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: "No tag found with this id" });
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// POST /api/tags
router.post("/", (req, res) => {
    // Create a category into Tag model
    Tag.create(
        { tag_name: req.body.tag_name }
    )
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// PUT /api/tags/id
router.put("/:id", (req, res) => {
    // Update a tag name by id
    Tag.update(
        { tag_name: req.body.tag_name }
       ,{ where: { id: req.params.id } }
    )
    .then(dbTagData => {
        if (!dbTagData[0]) {
            res.status(404).json({ message: "No tag found with this id" });
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// DEL /api/tags/id
router.delete("/:id", (req, res) => {
    // Delete a tag name by id
    Tag.destroy(
      { where: { id: req.params.id } }
    )
    .then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: "No tag found with this id" });
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;