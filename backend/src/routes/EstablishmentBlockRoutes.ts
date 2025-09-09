import { Router } from "express";
import {
  createBlock,
  getBlocks,
  getBlockById,
  updateBlock,
  deleteBlock,
} from "../controllers/EstablishmentBlockController";

const router = Router();

router.post("/", createBlock);
router.get("/", getBlocks);
router.get("/:id", getBlockById);
router.put("/:id", updateBlock);
router.delete("/:id", deleteBlock);

export default router;
