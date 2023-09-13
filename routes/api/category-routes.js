// Import Router and models
const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Listens for GET requests to retrieve all categories
router.get("/", async (req, res) => {
  try {
    // Use 'Category.findAll()' method to find all categories
    const categoryData = await Category.findAll({
      include: [{ model: Product }], // Include associated products in each category
    });
    // Send retrieved category data if successful
    res.status(200).json(categoryData);
  } catch (err) {
    // Send error details if error occurred
    res.status(500).json(err);
  }
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
