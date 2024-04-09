import Router from "express";
import authRouter from "./auth.router";
import paymentsRouter from "./payments.router";
import userRouter from "./users.router";
const router = Router();

router.use("/auth", authRouter);
router.use("/payments", paymentsRouter);
router.use("/users", userRouter);

router.get("/", (req, res) => {
  res.send("Hello World");
});

export default router;
