import { Router } from "express";
import {
  createBand,
  getBands,
  getBandById,
  updateBand,
  deleteBand,
} from "../controllers/BandController";

const router = Router();

router.post("/", createBand);
router.get("/", getBands);
router.get("/:id", getBandById);
router.put("/:id", updateBand);
router.delete("/:id", deleteBand);

export default router;
