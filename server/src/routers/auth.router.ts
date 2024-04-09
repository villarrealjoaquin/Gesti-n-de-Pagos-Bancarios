import Router from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/verify", authController.verifyToken);

export default router;
