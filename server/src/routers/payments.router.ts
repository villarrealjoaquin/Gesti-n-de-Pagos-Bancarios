import Router from "express";
import paymentsController from "../controllers/payment.controller";
import { validateToken } from "../middlewares/ValidateToken";

const router = Router();

router.get("/", paymentsController.getAllPayments);
router.get("/:id",validateToken, paymentsController.getPayment);
router.post("/:id", validateToken, paymentsController.Payment);
router.post("/", validateToken, paymentsController.createPayment);
router.patch("/:id", validateToken, paymentsController.updatePayment);
router.delete("/:id", validateToken, paymentsController.deletePayment);

export default router;
