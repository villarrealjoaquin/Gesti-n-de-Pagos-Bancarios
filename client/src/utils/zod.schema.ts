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
  type: z.enum(["factura", "transferencia", "deposito", "tarjeta", "compra"], {
    invalid_type_error: "Tipo de Pago inválido",
  }),
  amount: z
    .number({ invalid_type_error: "Monto inválido" })
    .min(1000, { message: "Monto inválido min 1000" }),
  description: z.string().min(1, { message: "Descripción inválida" }),
  category: z.enum([
    "Hogar",
    "Transporte",
    "Alimentación",
    "Entretenimiento",
    "Otros",
  ]),
});
