import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type User } from "../types/user.type";

export const hashPassword = (password: string, salt: number) => {
  return bcrypt.hash(password, salt);
};

export const comparePasswords = (
  password: string,
  storedPasswordHash: string
) => {
  return bcrypt.compare(password, storedPasswordHash);
};

export const generateToken = (user: Partial<User>) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};
