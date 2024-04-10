import type { Request, Response } from "express";
import userService from "../services/user.service";
import { HttpStatus } from "../utils/http-status-enum";
import type { User } from "../types/user.type";

class UserController {
  async getUsers(_req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      const dataWithoutPassword = users.map((user: Partial<User>) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        payments: user.payments,
      }));
      return res.status(HttpStatus.OK).json(dataWithoutPassword);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error getting users" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const user = await userService.getUserById(userId);
      return res.status(user.status).json(user.data);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error creating user" });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const response = await userService.createUser(body);
      return res.status(response.status).json(response.data);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error creating user" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const body = req.body;
      const response = await userService.updateUser(userId, body);
      return res.status(response.status).json(response.data);
    } catch (error) {
      console.log(error);
      
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error creating user" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const response = await userService.deleteUser(userId);
      return res.status(response.status).json(response.data);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error creating user" });
    }
  }
}

export default new UserController();
