import { Router } from "express";
import { JobController } from "../controllers/jobController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();
const ctrl = new JobController();

router.get("/", ctrl.list);
router.post("/", auth, ctrl.create);
router.get("/:id", ctrl.get);
router.post("/:id/bid", auth, ctrl.bid);
router.post("/:id/close", auth, ctrl.close);

export default router;
