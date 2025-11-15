import { Router } from "express";
import { PaymentController } from "../controllers/paymentController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();
const ctrl = new PaymentController();

router.post("/create-order", auth, ctrl.createOrder);
router.post("/verify", auth, ctrl.verifyPayment);

export default router;
