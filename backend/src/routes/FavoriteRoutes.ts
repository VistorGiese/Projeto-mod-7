import { Router } from "express";
import {
  createFavorite,
  getFavorites,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
} from "../controllers/FavoriteController";

const router = Router();

router.post("/", createFavorite);
router.get("/", getFavorites);
router.get("/:id", getFavoriteById);
router.put("/:id", updateFavorite);
router.delete("/:id", deleteFavorite);

export default router;
