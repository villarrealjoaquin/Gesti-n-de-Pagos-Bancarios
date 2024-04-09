import type { Payment } from "../types/payment.type";
import { generateCurrentDate } from "../utils/generateCurrentDate";
import { PaymentRepository } from "./payments.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaRepository implements PaymentRepository {
  async getAllPayments(): Promise<Payment[]> {
    const payments = await prisma.payment.findMany();
    return payments;
  }
  async getPayment(id: number): Promise<Payment | null> {
    const payment = await prisma.payment.findUnique({
      where: {
        id,
      },
    });
    if (!payment) {
      return null;
    }
    return payment;
  }

  async createPayment(data: Payment, userId: number): Promise<Payment> {
    const currentDate = generateCurrentDate();
    const transactionNumber = Date.now().toString().slice(0, 10);
    const status = "pendiente";
    const newPayment = {
      ...data,
      userId,
      date: currentDate,
      transaction_Number: Number(transactionNumber),
      amountPaid: 0,
      status,
    };
    const payment = await prisma.payment.create({
      data: newPayment,
    });
    return payment;
  }

  async deletePayment(paymentId: number, userId: number): Promise<Payment> {
    const payment = await prisma.payment.delete({
      where: {
        id: paymentId,
        userId,
      },
    });
    return payment;
  }

  async payment(
    paymentId: number,
    userId: number,
    amount: number
  ): Promise<Payment | null> {
    const findPayment = await prisma.payment.findUnique({
      where: {
        id: paymentId,
        userId,
      },
    });
    if (!findPayment) {
      return null;
    }
    let quantity = amount + findPayment.amountPaid;
    if (quantity > findPayment.amount) {
      quantity = findPayment.amount;
    }
    const updateStatus = prisma.payment.update({
      where: {
        id: paymentId,
        userId,
      },
      data: {
        amountPaid: quantity,
        status: amount === findPayment.amount ? "Completado" : "Pendiente",
      },
    });
    return updateStatus;
  }

  async updatePayment(
    id: number,
    userId: number,
    data: Payment
  ): Promise<Partial<Payment>> {
    const formattedData = {
      ...data,
      date: data.date
        ? typeof data.date === "string"
          ? data.date
          : data.date.toString()
        : undefined,
    };
    const payment = await prisma.payment.update({
      where: {
        id,
        userId,
      },
      data: formattedData,
    });
    return payment;
  }
}
