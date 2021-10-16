import { Router } from "express";

import {
  signUp,
  signIn
} from "../controllers/auth.controllers.js";

const router = Router();

// Sign Up
router.post('/signup', signUp);

// Sign In
router.post('/signin', signIn);

export default router;
