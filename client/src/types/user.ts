import type { Payment } from "./payments";

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  payments: Payment[];
};
