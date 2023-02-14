"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const products_1 = require("../controllers/products");
const router = (0, express_1.Router)();
// Create a new product
router.post("/", auth_1.protection, products_1.createProduct);
// Get all products
router.get("/", products_1.getProducts);
router.route("/all").get(products_1.getProducts);
// Get single product by id
router.get("/:id", products_1.getProduct);
// Update product by id
router.put("/:id", auth_1.protection, products_1.updateProduct);
// Delete product by id
router.delete("/:id", auth_1.protection, products_1.deleteProduct);
exports.default = router;
