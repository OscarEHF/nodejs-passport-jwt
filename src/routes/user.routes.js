import { Router } from "express";
import passport from "passport";

import { isAdmin } from '../controllers/auth.controllers.js';

import {
  createUser,
  getUsers,
  getUser
} from "../controllers/user.controllers.js";

const router = Router();

// New User
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  createUser
);

// Get Users
router.get('/', getUsers);
router.get('/:userId', getUser);

export default router;
