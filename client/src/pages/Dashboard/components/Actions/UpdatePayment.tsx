import { Button, InputForm } from "@/components";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/services/payment.service";
import { useAuthStore } from "@/store/user.store";
import type { Payment } from "@/types/payments";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const DEFAULT_VALUES_FORM_PAYMENT = {
  description: "",
  type: "",
  amount: 0,
  category: "",
};

type PaymentDataType = typeof DEFAULT_VALUES_FORM_PAYMENT;

export default function UpdatePayment({ payment }: { payment: Payment }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentDataType>();
  const token = useAuthStore((state) => state.token);
  const updatePayment = useAuthStore((state) => state.updatePaymentInUser);
  
  const onSubmit = async (data: PaymentDataType) => {
    try {
      const paymentId = Number(payment.id);
      const res = await api.updatePayment(paymentId, data, token);
      if (res.data) {
        toast.success("Pago actualizado");
        updatePayment(res.data);
        reset();
      }
    } catch (error) {
      toast.error("Error al actualizar el pago");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="grid gap-4">
            <Button>Editar</Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Editar Pago</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              label="Monto"
              id="amount"
              type="number"
              defaultValue={payment.amount}
              {...register("amount", { valueAsNumber: true })}
              error={errors.amount}
            />
            <InputForm
              label="Descripcion"
              id="description"
              type="text"
              defaultValue={payment.description}
              {...register("description")}
              error={errors.amount}
            />
            <InputForm
              label="Tipo"
              id="type"
              type="text"
              defaultValue={payment.type}
              {...register("type")}
              error={errors.amount}
            />
            <InputForm
              label="Categoría"
              id="category"
              type="text"
              defaultValue={payment.category}
              {...register("category")}
              error={errors.amount}
            />
            <DialogClose asChild>
              <Button type="submit">Editar</Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
