import { create, StateCreator } from "zustand";
import { persist, PersistOptions, createJSONStorage } from "zustand/middleware";
import type { User } from "../types/user";
import { Payment } from "@/types/payments";

type State = {
  user: User | null;
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type Actions = {
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setisLoading: (isLoading: boolean) => void;
  addPaymentToUser: (payment: Payment) => void;
  payment: (paymentId: number, amount: number) => void;
  updatePaymentInUser: (payment: Payment) => void;
  deletePaymentFromUser: (paymentId: number) => void;
};

type AuthType = State & Actions;

type Persist = (
  config: StateCreator<AuthType>,
  options: PersistOptions<AuthType>
) => StateCreator<AuthType>;

export const useAuthStore = create<AuthType>(
  (persist as Persist)(
    (set) => ({
      user: null,
      token: "",
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setisLoading: (isLoading) => set({ isLoading }),
      addPaymentToUser: (payment) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              payments: [...state.user.payments, payment],
            },
          };
        });
      },
      updatePaymentInUser: (payment: Payment) => {
        set((state) => {
          if (!state.user) return state;
          const updatePayment = state.user.payments.map((pay) => {
            return pay.id === payment.id ? payment : pay;
          });
          return {
            user: {
              ...state.user,
              payments: updatePayment,
            },
          };
        });
      },
      deletePaymentFromUser: (paymentId: number) => {
        set((state) => {
          if (!state.user) return state;
          const paymentsMap = new Map<number, Payment>(
            state.user.payments.map((payment) => [payment.id, payment])
          );
          paymentsMap.delete(paymentId);
          return {
            user: {
              ...state.user,
              payments: Array.from(paymentsMap.values()),
            },
          };
        });
      },
      payment: (paymentId: number, amount: number) => {
        set((state) => {
          if (!state.user) return state;
          const paid = state.user.payments.map((payment) => {
            if (payment.id !== paymentId) return payment;
            let quantity = amount + payment.amountPaid;
            if (quantity > payment.amount) {
              quantity = payment.amount;
            }
            const status =
              amount === payment.amount ? "Completado" : "Pendiente";
            return {
              ...payment,
              amountPaid: quantity,
              status,
            };
          });
          return {
            user: {
              ...state.user,
              payments: paid,
            },
          };
        });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
