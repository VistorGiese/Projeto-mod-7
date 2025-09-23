import { Router } from "express";
import {
  createEstablishment,
  getEstablishments,
  getEstablishmentById,
  updateEstablishment,
  deleteEstablishment,
} from "../controllers/EstablishmentController";
import { authMiddleware } from "../middleware/authmiddleware";

const router = Router();

router.post("/", createEstablishment);
router.get("/", getEstablishments);
router.get("/:id", getEstablishmentById);
router.put("/:id", authMiddleware, updateEstablishment);
router.delete("/:id", authMiddleware, deleteEstablishment);

export default router;
