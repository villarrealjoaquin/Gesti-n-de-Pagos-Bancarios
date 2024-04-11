import { AddPaymentIcon, Button, InputForm, Label } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { categories, paymentTypes } from "@/constants";
import api from "@/services/payment.service";
import { useAuthStore } from "@/store/user.store";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const DEFAULT_VALUES_FORM_PAYMENT = {
  description: "",
  type: "Transferencia",
  amount: 10000,
  category: "",
};

type DataForm = typeof DEFAULT_VALUES_FORM_PAYMENT;

export default function AddPayment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUES_FORM_PAYMENT,
  });
  const token = useAuthStore((state) => state.token);
  const addPaymentToUser = useAuthStore((state) => state.addPaymentToUser);

  const onSubmit = async (data: DataForm) => {
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              label="Descripción"
              id="description"
              type="text"
              {...register("description")}
              error={errors.description}
            />

            <div className="flex flex-col mb-4 gap-3 w-full">
              <Label htmlFor="type" className="text-black mb-1">
                Tipo de Pago
              </Label>
              <select
                id="type"
                name="type"
                className="text-black w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                defaultValue={"Transferencia"}
              >
                <option value="" disabled>
                  Seleccionar Tipo
                </option>
                {paymentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <InputForm
              label="Monto ($)"
              type="number"
              id="amount"
              step="any"
              {...register("amount", { valueAsNumber: true })}
              error={errors.amount}
            />

            <div className="flex flex-col mb-4 gap-3 w-full">
              <Label htmlFor="category" className="text-black mb-1">
                Categoría
              </Label>
              <select
                id="category"
                name="category"
                className="text-black w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                defaultValue={"Entretenimiento"}
              >
                <option value="" disabled>
                  Seleccionar Categoría
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <DialogClose>
              <Button type="submit">
                Agregar
              </Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
