import { PaymentRepository } from "../repositories/payments.repository";
import type { Payment } from "../types/payment.type";

class PaymentService {
  private readonly paymentRepository: PaymentRepository;

  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }
  async getAll() {
    return this.paymentRepository.getAllPayments();
  }

  async getItem(id: number) {
    return this.paymentRepository.getPayment(id);
  }

  async payment (id: number, userId: number, amount: number) {
    return this.paymentRepository.payment(id, userId, amount);
  }

  async createItem(data: Payment, userId: number) {
    return this.paymentRepository.createPayment(data, userId);
  }

  async deleteItem(paymentId: number, userId: number) {
    return this.paymentRepository.deletePayment(paymentId, userId);
  }

  async updateItem(id: number, userId: number, data: Payment) {
    return this.paymentRepository.updatePayment(id, userId, data);
  }
}

export default PaymentService;
