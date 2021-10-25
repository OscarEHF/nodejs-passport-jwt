import { Router } from "express";
import passport from "passport";

import {
  isModerator,
  isAdmin
} from '../controllers/auth.controllers.js';

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controllers.js";

const router = Router();

// New Product
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isModerator,
  createProduct
);

// Get Products
router.get('/', getProducts);
router.get('/:productId', getProduct);

// Update Product
router.put(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  updateProduct
);

// Delete Product
router.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  deleteProduct
);

export default router;
