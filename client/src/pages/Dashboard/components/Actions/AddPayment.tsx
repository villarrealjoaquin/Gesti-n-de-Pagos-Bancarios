import { AddPaymentIcon, Button, InputForm } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/services/payment.service";
import { useAuthStore } from "@/store/user.store";
import { paymentSchema } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const DEFAULT_VALUES_FORM_PAYMENT = {
  description: "pago de agua",
  type: "transferencia",
  amount: 10000,
  category: "servicios",
};

type DataForm = typeof DEFAULT_VALUES_FORM_PAYMENT;

export default function AddPayment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: DEFAULT_VALUES_FORM_PAYMENT,
  });
  const token = useAuthStore((state) => state.token);
  const addPaymentToUser = useAuthStore((state) => state.addPaymentToUser);

  const addPayment = async (data: DataForm) => {
    try {
      const res = await api.createPayment(data, token);
      if (res.data) {
        toast.success("Se agrego correctamente el pago");
        addPaymentToUser(res.data.created);
        reset();
      }
    } catch (error) {
      toast.error("Error al agregar el pago");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-500 hover:bg-green-600">
            <AddPaymentIcon /> Agregar Pago
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agrega un nuevo pago</DialogTitle>
            <DialogDescription>
              Agrega un nuevo pago al sistema de pagos de tu cuenta.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(addPayment)}>
            <InputForm
              label="Descripción"
              id="description"
              type="text"
              {...register("description")}
              error={errors.description}
            />
            <InputForm
              label="tipo de Pago"
              id="type"
              type="text"
              {...register("type")}
              error={errors.type}
            />
            <InputForm
              label="Monto ($)"
              type="number"
              id="amount"
              step="any"
              {...register("amount", { valueAsNumber: true })}
              error={errors.amount}
            />
            <InputForm
              label="Categoría"
              type="text"
              id="category"
              {...register("category")}
              error={errors.category}
            />
            <Button type="submit">Confirm</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
