import { Router } from "express";
import {
  createEstablishment,
  getEstablishments,
  getEstablishmentById,
  updateEstablishment,
  deleteEstablishment,
  addEstablishmentManager,
} from "../controllers/EstablishmentController";

const router = Router();

router.post("/", createEstablishment);
router.get("/", getEstablishments);
router.get("/:id", getEstablishmentById);
router.put("/:id", updateEstablishment);
router.delete("/:id", deleteEstablishment);
router.post("/add-manager", addEstablishmentManager);

export default router;
