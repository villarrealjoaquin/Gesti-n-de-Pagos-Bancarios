export interface Payment {
  id: number;
  date: String;
  description: string;
  type: string;
  transaction_Number: number;
  status: string;
  amount: number;
  amountPaid: number;
  category: string;
  userId?: number;
}
