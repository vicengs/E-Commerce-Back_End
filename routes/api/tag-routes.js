/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : tag-routes.js       */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/28/2022          */
/* ------------------------------ */
// Add router express module to use
const router = require('express').Router();
// Include Tag, Product and transactional model to use
const { Tag, Product, ProductTag, Category } = require('../../models');
// GET /api/tags
router.get('/', (req, res) => {
    // Access our Category model to get all categories
    Tag.findAll({
        //attributes: ["id", "tag_name"]
       //,order:      ["id"]
        // JOIN to Product through ProductTag to get its fields
       include: [
            { model: Product
              //,attributes: ["id", "product_name", "price", "stock", "category_id"]
              ,through: ProductTag
              ,as: 'products'
            }
        ]
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
