import { Request, Response } from "express";
import { HttpStatus } from "../utils/http-status-enum";
import authService from "../services/auth.service";

class AuthController {
  constructor() {}

  async signUp(req: Request, res: Response) {
    try {
      const response = await authService.register(req.body);
      return res.status(response.status).json({ data: response.data });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error creating user" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const response = await authService.signIn(email, password);
      return res.status(response.status).json({
        user: response.data,
        token: response.token,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error logging in" });
    }
  }

  async logout(_req: Request, res: Response) {
    try {
      res.clearCookie("challenge");
      res.json({ message: "Logout success" });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error logging out" });
    }
  }

  async verifyToken(req: Request, res: Response) {
    try {
      const challenge = req.headers.authorization?.split(" ")[1];
      if (!challenge) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }
      await authService.validateToken(challenge, process.env.JWT_SECRET, res);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error verifying token" });
    }
  }
}

export default new AuthController();
