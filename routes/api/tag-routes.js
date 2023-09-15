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
    // Send error details if an error occurred
    res.status(500).json({ message: "Failed to retrieve tags.", error: err });
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
    // Send error details if an error occurred
    res
      .status(500)
      .json({ message: "Failed to retrieve the tag.", error: err });
  }
});

// POST a new tag
router.post("/", async (req, res) => {
  try {
    // Create a new tag using 'Tag.create()' method
    const newTag = await Tag.create(req.body);

    // Send a success response with the newly created tag
    res.status(201).json({
      message: "Tag created successfully.",
      data: newTag,
    });
  } catch (err) {
    // Send error details if an error occurred
    res.status(400).json({ message: "Failed to create the tag.", error: err });
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
