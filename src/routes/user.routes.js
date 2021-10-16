import { Router } from "express";

import {
  createUser,
  getUsers,
  getUser
} from "../controllers/user.controllers.js";

const router = Router();

// New User
router.post('/', createUser);

// Get Users
router.get('/', getUsers);
router.get('/:userId', getUser);

export default router;
