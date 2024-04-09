import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email inválido" })
    .min(10, { message: "Email inválido" }),
  password: z.string().min(6, { message: "Contraseña inválida" }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Nombre inválido" }),
  email: z
    .string()
    .email({ message: "Email inválido" })
    .min(10, { message: "Email inválido" }),
  password: z.string().min(6, { message: "Contraseña inválida" }),
});

export const paymentSchema = z.object({
  type: z.string().min(1, { message: "Tipo de pago inválido" }),
  amount: z
    .number({ invalid_type_error: "Monto inválido" })
    .min(1, { message: "Monto inválido" }),
  description: z.string().min(1, { message: "Descripción inválida" }),
  category: z.string().min(1, { message: "Categoría inválida" }),
});