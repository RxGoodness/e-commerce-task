import { Router } from "express";
import { protection } from "../middleware/auth";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/products";

const router = Router();

// Create a new product
router.post("/", protection, createProduct);

// Get all products
router.get("/", getProducts);
router.route("/all").get(getProducts);


// Get single product by id
router.get("/:id", getProduct);

// Update product by id
router.put("/:id", protection, updateProduct);

// Delete product by id
router.delete("/:id", protection, deleteProduct);

export default router;

