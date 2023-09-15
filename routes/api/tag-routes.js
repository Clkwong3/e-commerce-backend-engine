// Import Router and models
const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// GET all the tags
router.get("/", async (req, res) => {
  try {
    // Use 'Tag.findAll()' method to find all tags
    // Include associated 'Product' and 'ProductTag' data in the response
    const tagData = await Tag.findAll({
      include: [{ model: Product, as: "products", through: ProductTag }],
    });

    // Send retrieved tag data if successful
    res.status(200).json({
      message: "Tags retrieved successfully.",
      data: tagData,
    });
  } catch (err) {
    // Log detailed error for developers
    console.error("Error occurred while retrieving tags:", err);

    // Send a generic error message to users
    res
      .status(500)
      .json({ message: "An error occurred while retrieving tags." });
  }
});

// GET one tag by ID
router.get("/:id", async (req, res) => {
  try {
    // Use 'Tag.findByPk()' method to find a tag by its primary key (id)
    // Include the associated 'Product' data in the response
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: "products", through: ProductTag }],
    });

    // Send the retrieved tag data if successful
    res.status(200).json({
      message: "Tag retrieved successfully.",
      data: tagData,
    });
  } catch (err) {
    // Log detailed error for developers
    console.error("Error occurred while retrieving the tag:", err);

    // Send a generic error message to users
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the tag." });
  }
});

// POST a new tag
router.post("/", async (req, res) => {
  try {
    // Create a new tag using 'Tag.create()' method
    const newTag = await Tag.create(req.body);

    // Send a success response with the newly created tag
    res.status(200).json({
      message: "Tag created successfully.",
      data: newTag,
    });
  } catch (err) {
    // Log detailed error for developers
    console.error("Error occurred while creating the tag:", err);

    // Send a generic error message to users
    res
      .status(500)
      .json({ message: "An error occurred while creating the tag." });
  }
});

// PUT (update) a tag by ID
router.put("/:id", async (req, res) => {
  try {
    // Find the tag using the primary key (id)
    const updatedTag = await Tag.findByPk(req.params.id);

    // If the tag doesn't exist, return a 404 error
    if (!updatedTag) {
      return res.status(404).json({ message: "Tag not found." });
    }

    // Update the tag's name with the new value from req.body
    await updatedTag.update(req.body);

    // Send response indicating success and include the updated tag data
    res.status(200).json({
      message: "Tag updated successfully.",
      data: updatedTag,
    });
  } catch (err) {
    // Log detailed error for developers
    console.error("Error occurred while updating the tag:", err);

    // Send a generic error message to users
    res
      .status(500)
      .json({ message: "An error occurred while updating the tag." });
  }
});

// DELETE a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    // Use Sequelize '.destroy()' method to delete the tag
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      // Resource not found
      return res.status(404).json({ message: "No tag found with this id." });
    }

    // Success: tag deleted
    res.status(200).json({
      message: "Tag deleted successfully.",
      data: deletedTag,
    });
  } catch (err) {
    // Log detailed error for developers
    console.error("Error occurred while deleting the tag:", err);

    // Send a generic error message to users
    res
      .status(500)
      .json({ message: "An error occurred while deleting the tag." });
  }
});

module.exports = router;
