import { Router } from "express";
import {
  createBand,
  getBands,
  getBandById,
  updateBand,
  deleteBand,
  addBandManager,
  addBandMember,
} from "../controllers/BandController";

const router = Router();

router.post("/", createBand);
router.get("/", getBands);
router.get("/:id", getBandById);
router.put("/:id", updateBand);
router.delete("/:id", deleteBand);
router.post("/add-manager", addBandManager);
router.post("/add-member", addBandMember);

export default router;
