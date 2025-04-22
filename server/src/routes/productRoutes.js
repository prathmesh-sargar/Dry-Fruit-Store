import express from "express";
import { fetchAllProducts,fetchProductsByCategory } from "../controller/productController.js";

const router = express.Router();

// Route to get all products
router.get("/products", fetchAllProducts);
router.get("/productsByCategory", fetchProductsByCategory);

export default router;

