// Import Router and models
const router = require("express").Router();
const { Category, Product } = require("../../models");

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

// Listens for GET requests to retrieve a single category by its `id` value
router.get("/:id", async (req, res) => {
  try {
    // Use 'Category.findByPk()' method to find a category by its primary key (id)
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // Send the retrieved category data if successful
    res.status(200).json(categoryData);
  } catch (err) {
    // Send error details if error occurred
    res.status(500).json(err);
  }
});

// Listen for POST request to the endpoint defined for creating categories
router.post("/", async (req, res) => {
  try {
    // Create a new category using 'Category.create()' method
    const categoryData = await Category.create(req.body);
    // Sends the newly created category data
    res.status(200).json(categoryData);
  } catch (err) {
    // Send error details if an error occurred
    res.status(500).json(err);
  }
});

// Listen for PUT request to the endpoint
router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id);

    // If the category doesn't exist, return a 404 error
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found." });
    }
    // Update the category's properties based on the request body
    categoryData.category_name = req.body.category_name;

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Listen for DELETE request to the endpoint by its `id` value
router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    // Use Sequelize's '.destroy()' method to delete the category
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if a category with the given id was found and deleted
    if (!categoryData) {
      return res
        .status(404)
        .json({ message: "No category found with this id." });
    }

    // Respond with a success message and the deleted category data
    res.status(200).json(categoryData);
  } catch (err) {
    // Send error details if an error occurred
    res.status(500).json(err);
  }
});

module.exports = router;
