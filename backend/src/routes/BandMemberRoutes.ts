import { Router } from "express";
import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/BandMemberController";

const router = Router();

router.post("/", createMember);
router.get("/", getMembers);
router.get("/:id", getMemberById);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;
