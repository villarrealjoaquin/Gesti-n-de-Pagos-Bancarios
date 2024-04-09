import type { Request, Response } from "express";
import { PrismaRepository } from "../repositories/prisma.repository";
import { HttpStatus } from "../utils/http-status-enum";
import PaymentService from "../services/payment.service";

class PaymentsController {
  constructor(private paymentService: PaymentService) {}

  async getAllPayments(_req: Request, res: Response) {
    try {
      const getAll = await paymentService.getAll();
      return res.status(HttpStatus.OK).json(getAll);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  }

  async getPayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Payment id is required" });
      }
      const payment = paymentService.getItem(Number(id));
      if (!payment) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Payment not found" });
      }
      return res.status(HttpStatus.OK).json(payment);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  }

  async createPayment(req: Request, res: Response) {
    try {
      const body = req.body;
      const userId = req.user?.id;
      const created = await paymentService.createItem(body, userId);
      return res.status(HttpStatus.CREATED).json({
        message: "Payment created successfully",
        created,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  }

  async Payment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const { amount } = req.body;
      const payment = await paymentService.payment(Number(id), userId, amount);
      if (!payment) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Payment not found" });
      }
      return res.status(HttpStatus.OK).json({ payment });
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  }

  async updatePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const body = req.body;
      if (!id) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Payment id is required" });
      }
      const update = await paymentService.updateItem(Number(id), userId, body);
      return res.status(HttpStatus.OK).json(update);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  }

  async deletePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      if (!id) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Payment id is required" });
      }
      const deleted = await paymentService.deleteItem(Number(id), userId);
      if (!deleted) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Payment not found" });
      }
      return res.status(HttpStatus.OK).json(deleted);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  }
}

const paymentService = new PaymentService(new PrismaRepository());
export default new PaymentsController(paymentService);
