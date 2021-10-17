import { Router } from "express";
import passport from "passport";

import {
  signUp,
  signIn
} from "../controllers/auth.controllers.js";

const router = Router();

// Sign Up
router.post('/signup', signUp);

// Sign In
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  signIn
);

export default router;
