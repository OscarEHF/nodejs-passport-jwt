import { Router } from "express";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controllers.js";

const router = Router();

// New Product
router.post('/', createProduct);

// Get Products
router.get('/', getProducts);
router.get('/:productId', getProduct);

// Update Product
router.put('/:productId', updateProduct);

// Delete Product
router.delete('/:productId', deleteProduct);

export default router;
