import { Router } from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../controllers/BookingController";
import { authMiddleware } from "../middleware/authmiddleware";

const router = Router();

router.post("/", authMiddleware, createBooking);
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.put("/:id", authMiddleware, updateBooking);
router.delete("/:id", authMiddleware, deleteBooking);

export default router;
