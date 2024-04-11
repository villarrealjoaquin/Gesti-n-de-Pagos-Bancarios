import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookiesParser from "cookie-parser";
import apiRouter from "./routers/index";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(json());
app.use(cookiesParser());
app.use("/api", apiRouter);
app.get("/", (_req, res) => {
  res.send("Hello World");
});

export default app;
