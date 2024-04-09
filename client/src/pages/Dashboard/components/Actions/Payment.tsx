import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, InputForm } from "@/components";
import api from "@/services/payment.service";
import { useAuthStore } from "@/store/user.store";
import type { Payment } from "@/types/payments";
import { toast } from "sonner";
import { useState } from "react";

export default function Payment({ payment }: { payment: Payment }) {
  const [amount, setAmount] = useState(0);
  const token = useAuthStore((state) => state.token);
  const paymentFn = useAuthStore((state) => state.payment);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const paymentId = Number(payment.id);
      const res = await api.payment(paymentId, amount, token);
      if (res.data) {
        toast.success("Pago actualizado");
        paymentFn(paymentId, amount);
      }
    } catch (error) {
      toast.error("Error al actualizar el pago");
    }
  };

  return (
    <>
      <div className="grid gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <div className="grid gap-4">
              <Button>Pagar</Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                Completa el pago
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <InputForm
                label="Monto"
                id="amount"
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
                defaultValue={payment.amount}
              />
              <Button type="submit">Editar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
