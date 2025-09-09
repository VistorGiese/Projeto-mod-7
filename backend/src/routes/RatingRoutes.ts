import { Router } from "express";
import {
  createRating,
  getRatings,
  getRatingById,
  updateRating,
  deleteRating,
} from "../controllers/RatingController";

const router = Router();

router.post("/", createRating);
router.get("/", getRatings);
router.get("/:id", getRatingById);
router.put("/:id", updateRating);
router.delete("/:id", deleteRating);

export default router;
