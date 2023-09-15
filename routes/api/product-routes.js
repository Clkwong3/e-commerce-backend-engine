// Import necessary modules
const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// Listen for GET requests to retrieve all products
router.get("/", async (req, res) => {
  try {
    // Use 'Product.findAll()' method to find all products with associated Category and Tag data
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, as: "tags" }],
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

// GET one product by ID
router.get("/:id", async (req, res) => {
  try {
    // Use 'Product.findByPk()' method to find a product by its primary key (id) with associated Category and Tag data
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, as: "tags" }],
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
    console.log(err);
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

      // Respond with the newly created 'productTagPairs'
      res.status(200).json({
        message: "Product Tag created successfully.",
        data: productTagPairs,
      });
    } else {
      // If no product tags, respond with the created product
      res.status(200).json(newProduct);
    }
  } catch (err) {
    // Send error details if an error occurred
    res
      .status(400)
      .json({ message: "Failed to create the product.", error: err });
  }
});

// PUT (update) a product by ID
router.put("/:id", async (req, res) => {
  try {
    // Update product data using Sequelize
    const [rowsUpdated, [updatedProduct]] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true, // This option returns the updated record(s)
    });

    if (rowsUpdated > 0) {
      // Rows were updated successfully
      res.status(200).json({
        message: "Product updated successfully.",
        updatedProduct, // Include the updated product data in the response
      });
    } else {
      // If the product isn't found, return a 404 error
      res.status(404).json({ message: "Product not found." });
    }
  } catch (err) {
    // Send error details if an error occurred
    res
      .status(400)
      .json({ message: "Failed to update the product.", error: err });
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
      return res
        .status(404)
        .json({ message: "No product found with this id." });
    }

    // Respond with a success message and the deleted product data
    res.status(200).json({
      message: "Product deleted successfully.",
      data: deletedProduct,
    });
  } catch (err) {
    // Send error details if an error occurred
    res
      .status(500)
      .json({ message: "Failed to delete the product.", error: err });
  }
});

module.exports = router;
