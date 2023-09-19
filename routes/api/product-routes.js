// Import necessary modules
const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// GET all products
router.get("/", async (req, res) => {
  try {
    // Retrieve all products with associated Category and Tag data
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, as: "tags" }],
    });

    // Send retrieved product data if successful
    res.status(200).json({
      message: "Products retrieved successfully.",
      data: productData,
    });
  } catch (err) {
    // Log and send an error message if an error occurred
    console.error("Error occurred while retrieving products:", err);
    res.status(500).json({ message: "Failed to retrieve products." });
  }
});

// GET one product by ID
router.get("/:id", async (req, res) => {
  try {
    // Retrieve a product by its primary key (id) with associated Category and Tag data
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, as: "tags" }],
    });

    // Send the retrieved product data if successful
    res.status(200).json({
      message: "Product retrieved successfully.",
      data: productData,
    });
  } catch (err) {
    // Log and send an error message if an error occurred
    console.error("Error occurred while retrieving the product:", err);
    res.status(500).json({ message: "Failed to retrieve the product." });
  }
});

// POST a new product
router.post("/", async (req, res) => {
  try {
    // Create a new product using 'Product.create()' method
    const newProduct = await Product.create(req.body);

    if (req.body.tagIds.length) {
      // Create product-tag associations if there are product tags
      const productTagPairs = req.body.tagIds.map((tag_id) => ({
        product_id: newProduct.id,
        tag_id,
      }));

      // Bulk insert product-tag associations into the 'ProductTag' model
      await ProductTag.bulkCreate(productTagPairs);

      // Fetch the associated tags for the newly created product
      const associatedTags = await Tag.findAll({
        where: {
          id: req.body.tagIds, // Array of tag IDs from the request body
        },
      });

      // Respond with the newly created 'productTagPairs'
      res.status(200).json({
        message: "Product Tag created successfully with tags.",
        data: productTagPairs,
        tags: associatedTags,
      });
    } else {
      // If no product tags, respond with the created product
      res.status(200).json(newProduct);
    }
  } catch (err) {
    // Log and send an error message if an error occurred
    console.error("Error occurred while creating the product:", err);
    res.status(400).json({ message: "Failed to create the product." });
  }
});

// PUT (update) a product by ID
router.put("/:id", async (req, res) => {
  try {
    // Extract the updated product data from the request body
    const updatedProduct = req.body;

    // Update the product by its ID
    const [updatedRows] = await Product.update(updatedProduct, {
      where: { id: req.params.id },
    });

    return updatedRows > 0
      ? // If at least one row was updated, it means the product was found and updated
        res.status(200).json({
          message: "Product updated successfully.",
          data: updatedProduct,
        })
      : // If no rows were updated, the product was not found
        res.status(404).json({ message: "Product not found." });
  } catch (err) {
    // Handle errors and send an error response
    console.error("Error occurred while updating the product:", err);
    res.status(400).json({ message: "Failed to update the product." });
  }
});

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
  try {
    // Use Sequelize '.destroy()' method to delete the product
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedProduct) {
      // Check if a product with the given id was found and deleted
      res.status(404).json({ message: "No product found with this id." });
    }

    // Respond with a success message and the deleted product data
    res.status(200).json({
      message: "Product deleted successfully.",
      data: deletedProduct,
    });
  } catch (err) {
    // Log and send an error message if an error occurred
    console.error("Error occurred while deleting the product:", err);
    res.status(500).json({ message: "Failed to delete the product." });
  }
});

module.exports = router;
