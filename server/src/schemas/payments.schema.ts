import { z } from "zod";

const PaymentSchema = z.object({
  description: z.string().min(1).max(255), 
  type: z.string().min(1).max(50), 
  amount: z.number().int().min(0), 
  category: z.string().min(1).max(50), 
});

module.exports = PaymentSchema;
