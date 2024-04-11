import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload, type VerifyErrors } from "jsonwebtoken";
import { HttpStatus } from "../utils/http-status-enum";

type JwtUser = JwtPayload | undefined | string;

type EncodedUser = {
  id: number;
  name: string;
  email: string;
};

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const challenge = req.headers.authorization?.split(" ")[1];
    if (!challenge) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        error: "Unauthorized",
      });
    }
    jwt.verify(
      challenge,
      process.env.JWT_SECRET,
      (error: VerifyErrors | null, user: JwtUser) => {
        if (error) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            error: "Unauthorized",
          });
        }
        req.user = user as EncodedUser;
        next();
      }
    );
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error, error: true });
  }
};
