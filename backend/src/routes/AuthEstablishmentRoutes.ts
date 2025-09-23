import { Router } from "express";
import { loginEstablishment } from "../controllers/AuthEstablishmentController";

const router = Router();

router.post("/login", loginEstablishment);

export default router;
