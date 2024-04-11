import Router from "express";
import authController from "../controllers/auth.controller";
import { validateResource } from "../middlewares/validateResource";
import { loginSchema, registerSchema } from "../schemas/user.schema";

const router = Router();

router.post("/signup", validateResource(registerSchema), authController.signUp);
router.post("/login", validateResource(loginSchema), authController.login);
router.get("/logout", authController.logout);
router.get("/verify", authController.verifyToken);

export default router;
