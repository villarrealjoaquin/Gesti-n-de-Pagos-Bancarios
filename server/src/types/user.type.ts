import type { Payment } from "./payment.type";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  payments: Payment[];
}