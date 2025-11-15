import { Router } from "express";
import { AuthController } from "../controllers/authController.js";

const router = Router();
const ctrl = new AuthController();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.get("/me", ctrl.me);

export default router;
