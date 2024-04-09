import { z } from "zod";

export function validateSchema<T extends z.ZodTypeAny>(schema: T, data: Record<string, any>): z.infer<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues.map((issue) => issue.message).join(', '));
    }
  }
}