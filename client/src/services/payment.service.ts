import { Payment } from "@/types/payments";
import instance from "./axios.config";

const api = {
  getAllPayments: () => instance.get("/payments"),
  getPayment: (id: number) => instance.get(`/payments/${id}`),
  payment: (id: number, amount: number, token: string) =>
    instance.post(
      `/payments/${id}`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  createPayment: (data: Partial<Payment>, token: string) =>
    instance.post("/payments", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updatePayment: (id: number, data: Partial<Payment>, token: string) =>
    instance.patch(`/payments/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deletePayment: (id: number, token: string) =>
    instance.delete(`/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default api;
