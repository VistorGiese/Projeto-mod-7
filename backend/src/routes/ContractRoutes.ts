import { Router } from "express";
import {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  deleteContract,
} from "../controllers/ContractController";

const router = Router();

router.post("/", createContract);
router.get("/", getContracts);
router.get("/:id", getContractById);
router.put("/:id", updateContract);
router.delete("/:id", deleteContract);

export default router;
