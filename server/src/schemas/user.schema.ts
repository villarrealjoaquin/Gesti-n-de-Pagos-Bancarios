import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }).max(20, { message: "Name cannot be longer than 20 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(20, { message: "Password cannot be longer than 20 characters" }),
});

export default userSchema;
