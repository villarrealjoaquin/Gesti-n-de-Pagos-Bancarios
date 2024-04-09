import { Button, InputForm } from "@/components";
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
      <div className="flex justify-between mb-3">
        <h3 className="text-2xl font-bold">Movimientos</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>{" "}
              Agregar Pago
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
      </div>
    </>
  );
}
