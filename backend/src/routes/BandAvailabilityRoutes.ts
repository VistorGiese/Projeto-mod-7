import { Router } from "express";
import {
  createAvailability,
  getAvailabilities,
  getAvailabilityById,
  updateAvailability,
  deleteAvailability,
} from "../controllers/BandAvailabilityController";

const router = Router();

router.post("/", createAvailability);
router.get("/", getAvailabilities);
router.get("/:id", getAvailabilityById);
router.put("/:id", updateAvailability);
router.delete("/:id", deleteAvailability);

export default router;
