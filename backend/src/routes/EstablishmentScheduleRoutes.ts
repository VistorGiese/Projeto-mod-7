import { Router } from "express";
import {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getSchedulesByEstablishment,
} from "../controllers/EstablishmentScheduleController";

const router = Router();

router.post("/", createSchedule);
router.get("/", getSchedules);
router.get("/:id", getScheduleById);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);
router.get("/estabelecimento/:id", getSchedulesByEstablishment);

export default router;
