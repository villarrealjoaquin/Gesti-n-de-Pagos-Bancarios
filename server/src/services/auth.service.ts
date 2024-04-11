import { PrismaClient } from "@prisma/client";
import type { Response } from "express";
import jwt, { type VerifyErrors } from "jsonwebtoken";
import type { User } from "../types/user.type";
import {
  comparePasswords,
  generateToken,
  hashPassword,
} from "../utils/authUtils";
import { HttpStatus } from "../utils/http-status-enum";

const prisma = new PrismaClient();

class authService {
  async register(user: User) {
    const existsUser = await this.findUser(user.email);
    if (existsUser) {
      return {
        status: HttpStatus.CONFLICT,
        data: { message: "User already exists" },
      };
    }
    const salt = 10;
    const passwordHash = await hashPassword(user.password, salt);
    const userData = {
      name: user.name,
      email: user.email,
      password: passwordHash,
    };
    const createUser = await prisma.user.create({
      data: userData,
      include: {
        payments: true,
      },
    });
    if (!createUser) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: { message: "Error creating user" },
      };
    }
    const token = generateToken({
      id: createUser.id,
      name: createUser.name,
      email: createUser.email,
    });
    return {
      status: HttpStatus.CREATED,
      data: {
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
        token,
      },
    };
  }

  async signIn(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { payments: true },
    });
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: "User not found" },
      };
    }
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        data: { message: "Invalid credentials" },
      };
    }
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    if (!token) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: { message: "Error generating token" },
      };
    }
    return {
      status: HttpStatus.OK,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        payments: user.payments,
      },
      token,
    };
  }

  async validateToken(token: string, secret: string, res: Response) {
    jwt.verify(token, secret, async (err: VerifyErrors | null, user: any) => {
      if (err) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }
      const userFound = await prisma.user.findUnique({
        where: { id: user.id },
      });
      if (!userFound) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }
      return {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
      };
    });
  }

  async findUser(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }
}

export default new authService();
