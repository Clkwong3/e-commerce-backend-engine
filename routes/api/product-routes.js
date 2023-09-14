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
    // Update product data using Sequelize
    const [rowsUpdated, [updatedProduct]] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true, // This option returns the updated record(s)
    });

    // Check the outcome of the product update operation
    if (rowsUpdated > 0) {
      // Rows were updated successfully
      res.status(200).json({
        message: "Product updated successfully.",
        updatedProduct: updatedProduct, // Include the updated product data in the response
      });
    } else {
      // No rows were updated (product with the specified ID not found)
      res.status(404).json({ message: "Product not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to update product.", error: err });
  }
});

// Listen for DELETE request to the endpoint by its `id` value
router.delete("/:id", async (req, res) => {
  // Delete one product by its `id` value
  try {
    // Use Sequelize's '.destroy()' method to delete the product
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if a product with the given id was found and deleted
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "No product found with this id." });
    }

    // Respond with a success message and the deleted product data
    res
      .status(200)
      .json({ message: "product deleted successfully.", data: deletedProduct });
  } catch (err) {
    // Send error details if an error occurred
    res.status(500).json({ message: "Failed to delete product.", error: err });
  }
});

module.exports = router;
