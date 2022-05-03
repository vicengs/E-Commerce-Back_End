/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : product-routes.js   */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 05/01/2022          */
/* ------------------------------ */
// Add router express module to use
const router = require('express').Router();
// Include Tag, Product, Category and transactional model to use
const { Product, Category, Tag, ProductTag } = require('../../models');
// GET /api/products
router.get('/', (req, res) => {
    // Access our Product model to get all categories
    Product.findAll({
      order: ["id"]
      // JOIN to Product through ProductTag to get its fields
     ,include: [
          { model: Category } 
         ,{ model: Tag
           ,through: ProductTag
           ,as: "tags"
          }
      ]
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// GET /api/products/id
router.get('/:id', (req, res) => {
    // Access our Product model to get product by id
    Product.findOne({
        where: { id: req.params.id }
        // JOIN to Tags through ProductTag to get its fields
       ,include: [
            { model: Category } 
           ,{ model: Tag
             ,through: ProductTag
             ,as: "tags"
            }
        ]
    })
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: "No product found with this id" });
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// POST /api/tags
router.post('/', (req, res) => {
  /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
  */
    // Create a category into Product model
    Product.create(req.body)
    .then((product) => {
        // If there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map((tag_id) => {
                return {
                    product_id: product.id,
                    tag_id,
                };
            });
            return ProductTag.bulkCreate(productTagIdArr);
        }
        // If no product tags, just respond
        res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});
// PUT /api/products/id
router.put('/:id', (req, res) => {
    // Update a product name, price, stock or tag id's by id
    Product.update(req.body, { where: { id: req.params.id } })
    .then((product) => {
        // Find all associated tags from ProductTag
        return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
        // Get list of current tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        // Create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
            return {
                product_id: req.params.id,
                tag_id,
            };
        });
        // Figure out which ones to remove
        const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
        // Run both actions
        return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
        ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
        // Console.log(err);
        res.status(400).json(err);
    });
});
// DEL /api/products/id
router.delete('/:id', (req, res) => {
    // Delete a product name by id
    Product.destroy(
      { where: { id: req.params.id } }
    )
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: "No product found with this id" });
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Export module router
module.exports = router;