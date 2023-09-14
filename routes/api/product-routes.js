// Import Router and models
const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// Listen for GET requests to retrieve all products
router.get("/", async (req, res) => {
  try {
    // Use 'Product.findAll()' method to find all products
    // Separate each model inside the 'include' array by enclosing them in their own object.
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });

    // Send retrieved product data if successful
    res.status(200).json({
      message: "Products retrieved successfully.",
      data: productData,
    });
  } catch (err) {
    // Send error details if an error occurred
    res
      .status(500)
      .json({ message: "Failed to retrieve products.", error: err });
  }
});

// Listen for GET requests to retrieve one product by its 'id'
router.get("/:id", async (req, res) => {
  try {
    // Use 'Product.findByPk()' method to find a product by its primary key (id)
    // Include the associated 'Category' and 'Tag' models in the response
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    // Send the retrieved product data if successful
    res.status(200).json({
      message: "Product retrieved successfully.",
      data: productData,
    });
  } catch (err) {
    // Send error details if an error occurred
    res
      .status(500)
      .json({ message: "Failed to retrieve the product.", error: err });
  }
});

// Listen for POST requests to create a new product
router.post("/", async (req, res) => {
  try {
    // Create a new product using 'Product.create()' method
    const product = await Product.create(req.body);

    // If there are product tags, create pairings to bulk create in the 'ProductTag' model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      // 'const productTagIdArr ' Code Break Down:
      // 'productTagIdArr' - A pairing between 1 product and 1 tag is represented in each object in this array
      // 'req.body.tagIds' - Each 'tagIds' from the 'req.body' object represents a tag associated with a product
      // '.map((tag_id)=> {})' - Use the '.map()' method to go through each 'tag_id' in the array and transforms it into an object with properties 'product_id' and 'tag_id'.
      // Each objects has 2 properties:
      //    'product_id' - ID of the newly created product
      //    'tag_id' - ID of the tag associated with with product
      // 'product_id: product.id' - Set the 'product_id' of the object to the 'id' of the newly created product
      // 'tag_id' - Set the 'tag_id' of the object to the current 'tag_id' being repeated

      // Create the product-tag associations
      await ProductTag.bulkCreate(productTagIdArr);
      // 'ProductTag.bulkCreate' Code Break Down:
      // 'ProductTag' - Represent 'ProductTag' table in database
      // '.bulkCreate' - Sequelize method that inserts multiple records(rows) into the database all at once
      // 'productTagIdArr' - Array of objects that reprsents a pairing between a product and tag with 'product_id' and 'tag_id' properties

      // Send the newly created 'productTagIds'
      res.status(200).json({
        message: "Product Tag created successfully.",
        data: productTagIdArr,
      });
    } else {
      // If no product tags, respond with the created product
      res.status(200).json(product);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create product.", error: err });
  }
});

// Listen for PUT requests to update a product
router.put("/:id", async (req, res) => {
  try {
    // Update product data
    const [rowsUpdated, [updatedProduct]] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true, // Return the updated product
    });
    // '[rowsUpdated, [updatedProduct]]' Code Break Down
    // 'rowsUpdated' - Shows how many records in the 'Product' table were affected by the update in the database
    // '[updatedProduct]' - Array containing the updated product data
    // 'returning: true' - Sequelize method to return the updated records as an array

    if (req.body.tagIds && req.body.tagIds.length) {
      // Get all existing 'ProductTag' records for a specific product
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      // Create a list of 'productTagsIds' that contains the 'tag_id' values from the 'productTags' array
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      // Create a list of 'newProductTags'
      // Filter the 'tagIds' to find new tags that are not in 'productTagIds'
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }));

      // Create a list of 'productTagsToRemove'
      // Filter 'productTags' to find tags to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Use Promise.all to run 2 operations in parallel for efficiency, one to remove and one to add
      // Remove the product tags found in 'productTagsToRemove'
      await ProductTag.destroy({ where: { id: productTagsToRemove } });

      // Create new product tags from 'newProductTags' that don't exist yet
      await ProductTag.bulkCreate(newProductTags);
    }

    // Send a response indicating success
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
