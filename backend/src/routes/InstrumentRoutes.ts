import { Router } from "express";
import {
  createInstrument,
  getInstruments,
  getInstrumentById,
  updateInstrument,
  deleteInstrument,
} from "../controllers/InstrumentController";

const router = Router();

router.post("/", createInstrument);
router.get("/", getInstruments);
router.get("/:id", getInstrumentById);
router.put("/:id", updateInstrument);
router.delete("/:id", deleteInstrument);

export default router;
