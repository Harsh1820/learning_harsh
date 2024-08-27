const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Create a product
router.post("/", productController.createProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get a single product by ID
router.get("/:id", productController.getProductById);

// Delete a product by ID
router.delete("/:id", productController.deleteProductById);

// Edit a product by ID
router.put("/:id", productController.updateProductById);

// Find products by name
router.get("/name/:name", productController.findProductsByName);

// Find products by availability
router.get("/availability/:availability", productController.findProductsByAvailability);

// Find products greater than a certain price
router.get("/price/:price", productController.findProductsGreaterThanPrice);

module.exports = router;
