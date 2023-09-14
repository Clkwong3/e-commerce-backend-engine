// Import Router and models
const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Listen for GET requests to retrieve all the tags
router.get("/", async (req, res) => {
  try {
    // Use 'Tag.findAll()' method to find all tags
    // Include associated 'Product' and 'ProductTag' data in the response
    const tagData = await Tag.findAll({
      include: [{ model: Product }, { model: ProductTag }],
    });

    // Send retrieved tag data if successful
    res.status(200).json({
      message: "Tag retrieved successfully.",
      data: tagData,
    });
  } catch (err) {
    // Send error details if an error occurred
    res.status(500).json({ message: "Failed to retrieve tags.", error: err });
  }
});

// Listen for GET requests to retrieve one tag by its 'id'
router.get("/:id", async (req, res) => {
  try {
    // Use 'Product.findByPk()' method to find a product by its primary key (id)
    // Include the associated 'Product' data in the response
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Product }],
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
      .json({ message: "Failed to retrieve the tag.", error: err });
  }
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
