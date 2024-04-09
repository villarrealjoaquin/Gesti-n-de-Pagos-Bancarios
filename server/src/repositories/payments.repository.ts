import type { Payment } from "../types/payment.type";

export interface PaymentRepository {
  getAllPayments(): Promise<Payment[]>;
  getPayment(id: number): Promise<Payment | null>;
  payment(id: number, userId: number, amount: number): Promise<Payment | null>;
  createPayment(data: Payment, userId: number): Promise<Payment>;
  deletePayment(id: number, userId: number): Promise<Payment>;
  updatePayment(
    id: number,
    userId: number,
    data: Payment
  ): Promise<Partial<Payment>>;
}
