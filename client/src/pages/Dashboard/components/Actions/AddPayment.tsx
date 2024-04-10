import { AddPaymentIcon, Button, InputForm, Label } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, paymentTypes } from "@/constants";
import api from "@/services/payment.service";
import { useAuthStore } from "@/store/user.store";
import { paymentSchema } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const DEFAULT_VALUES_FORM_PAYMENT = {
  description: "",
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
              <Label id="type">Tipo de Pago</Label>
              <Select {...register("type")}>
                <SelectTrigger className="text-black w-full">
                  <SelectValue placeholder="Seleccionar Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Label id="category">Categoría</Label>
              <Select {...register("category")}>
                <SelectTrigger className="text-black w-full">
                  <SelectValue placeholder="Seleccionar Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit">Agregar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
