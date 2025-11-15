import { Router } from "express";
import authRoutes from "./authRoutes.js";
import jobRoutes from "./jobRoutes.js";
import paymentRoutes from "./paymentRoutes.js";

export const router = Router();
router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/payments", paymentRoutes);

export default router;
