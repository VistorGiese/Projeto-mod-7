import express from "express";
import {
  getAll,
  getUserById,
  CreateUser,
  updaterUser,
  DestroyUserById,
  listUsers,
  switchProfile,
} from "../controllers/UserController";
//import { authMiddleware } from '../middleware/authmiddleware';

const router = express.Router();

router.post("/", CreateUser);
router.post("/switch-profile", switchProfile);
router.get("/list", listUsers);
router.get("/", getAll);
router.get("/:id", getUserById);
router.patch("/:id", updaterUser);
router.delete("/:id",  DestroyUserById);

export default router;