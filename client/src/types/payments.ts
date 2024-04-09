import type { User } from "./user";

export type Payment = {
  id: number;
  date: string;
  description: string;
  type: string;
  transaction_Number: number;
  status: string;
  amount: number;
  amountPaid: number;
  category: string;
  userId: number;
  user: User;
};
