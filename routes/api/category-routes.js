// Import Router and models
const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// GET all categories
router.get("/", async (req, res) => {
  try {
    // Retrieve all categories with associated products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    // Send retrieved category data if successful
    res.status(200).json({
      message: "Categories retrieved successfully.",
      data: categoryData,
    });
  } catch (err) {
    // Log and send an error message if an error occurred
    console.error("Error occurred while retrieving categories:", err);
    res.status(500).json({ message: "Failed to retrieve categories." });
  }
});

// GET one category by ID
router.get("/:id", async (req, res) => {
  try {
    // Retrieve a category by its primary key (id) with associated products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // Send the retrieved category data if successful
    res.status(200).json({
      message: "Category retrieved successfully.",
      data: categoryData,
    });
  } catch (err) {
    // Log and send an error message if an error occurred
    console.error("Error occurred while retrieving the category:", err);
    res.status(500).json({ message: "Failed to retrieve category." });
  }
});

// POST a new category
router.post("/", async (req, res) => {
  try {
    // Create a new category using 'Category.create()' method
    const newCategory = await Category.create(req.body);

    // Send the newly created category data
    res
      .status(201)
      .json({ message: "Category created successfully.", data: newCategory });
  } catch (err) {
    // Log and send an error message if an error occurred
    console.error("Error occurred while creating the category:", err);
    res.status(500).json({ message: "Failed to create category." });
  }
});

// PUT (update) a category by ID
router.put("/:id", async (req, res) => {
  // Update a category by its `id` value
  try {
    // Find the category by its primary key (id)
    const updatedCategory = await Category.findByPk(req.params.id);

    // If the category doesn't exist, return a 404 error
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Update the category's properties based on the request body
    updatedCategory.category_name = req.body.category_name;

    // Save the updated category data using Sequelize '.save()' method
    await updatedCategory.save();

    // Send a response indicating success
    res.status(200).json({
      message: "Category updated successfully.",
      data: updatedCategory,
    });
  } catch (err) {
    // Log and send an error message if an error occurred
    console.error("Error occurred while updating the category:", err);
    res.status(500).json({ message: "Failed to update category." });
  }
});

// DELETE a category by ID
router.delete("/:id", async (req, res) => {
  // Delete a category by its `id` value
  try {
    // Use Sequelize's '.destroy()' method to delete the category
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if a category with the given id was found and deleted
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ message: "No category found with this id." });
    }

    // Respond with a success message and the deleted category data
    res.status(200).json({
      message: "Category deleted successfully.",
      data: deletedCategory,
    });
  } catch (err) {
    // Log and send an error message if an error occurred
    console.error("Error occurred while deleting the category:", err);
    res.status(500).json({ message: "Failed to delete category." });
  }
});

module.exports = router;
