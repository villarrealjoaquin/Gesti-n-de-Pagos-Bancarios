import type { Request, Response, NextFunction } from "express";
import { z, type ZodSchema } from "zod";
import { HttpStatus } from "../utils/http-status-enum";

export const validateResource = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(error.issues.map((issue) => issue.message).join(", "));
      }
    }
  };
