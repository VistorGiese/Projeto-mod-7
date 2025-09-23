import { Router } from "express";
import {
	applyBandToEvent,
	getBandApplicationsForEvent
} from "../controllers/BandApplicationController";
import { acceptBandApplication } from "../controllers/BandApplicationController";
import { authMiddleware } from "../middleware/authmiddleware";

const router = Router();

router.post("/", applyBandToEvent);
router.get("/:evento_id", getBandApplicationsForEvent);
router.put("/:id/aceitar", authMiddleware, acceptBandApplication);

export default router;
