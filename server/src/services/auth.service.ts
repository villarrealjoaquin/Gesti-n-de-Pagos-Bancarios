import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { type VerifyErrors } from "jsonwebtoken";
import type { User } from "../types/user.type";
import { HttpStatus } from "../utils/http-status-enum";
import type { Response } from "express";

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
    const passwordHash = await this.hashPassword(user.password, salt);
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
    const token = this.generateToken({
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
    const isPasswordValid = await this.comparePasswords(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        data: { message: "Invalid credentials" },
      };
    }
    const token = this.generateToken({
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

  // async isValidToken(token: string) {
  //   const user = this.validateToken(token, process.env.JWT_SECRET);
  //   if (!user) {
  //     return {
  //       status: HttpStatus.UNAUTHORIZED,
  //       data: { message: "Unauthorized" },
  //     };
  //   }
  //   return {
  //     status: HttpStatus.OK,
  //     data: {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //     },
  //   };
  // }

  async validateToken(token: string, secret: string, res: Response) {
    jwt.verify(token, secret, async (err: VerifyErrors | null, user: any) => {
      if (err) {
        console.log(err, "entre");

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

  hashPassword(password: string, salt: number) {
    return bcrypt.hash(password, salt);
  }

  generateToken(user: Partial<User>) {
    return jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }

  comparePasswords(password: string, storedPasswordHash: string) {
    return bcrypt.compare(password, storedPasswordHash);
  }
}

export default new authService();
