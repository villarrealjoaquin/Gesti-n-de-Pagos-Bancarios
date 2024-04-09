import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components";
import { useState } from "react";
import type { Payment } from "@/types/payments";
import { useAuthStore } from "@/store/user.store";

export default function FilterPayments() {
  const [type, setType] = useState<string>("");
  const [payments, setPayments] = useState<Payment[]>([]);
  const user = useAuthStore((state) => state.user);
  const filterPayments = useAuthStore((state) => state.filterPayments);

  const filteredProducts = user?.payments.filter((payment) => {
    return payment.type === type;
  });

  // const filteredPayments = (payments: Payment[]) => {
  //   const filtered = payments.filter((payment) => {
  //     return payment.type === type;
  //   });
  //   return filtered;
  // };

  // const handleFilter = () => {
  //   const filtered = filteredPayments(user?.payments);
  //   filterPayments(filtered);
  // };

  // console.log(user.payments);
  return (
    <>
      <div className="flex justify-center space-x-3">
        <Select onValueChange={setType}>
          <SelectTrigger className="w-[180px] text-black">
            <SelectValue placeholder="Seleccionar Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Factura">Factura</SelectItem>
            <SelectItem value="transferencia">transferencia</SelectItem>
            <SelectItem value="Compra">Compra</SelectItem>
            <SelectItem value="tarjeta">Tarjeta de Crédito</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px] text-black">
            <SelectValue placeholder="Seleccionar Tipo" />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>
        <Button>Filtrar</Button>
      </div>
    </>
  );
}
