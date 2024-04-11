import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableCaption,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Payment as PaymentType } from "@/types/payments";
import { DeletePayment, UpdatePayment, Payment } from "./Actions";
import ActionsIcons from "../../../components/icons/ActionsIcons";

export default function PaymentTable({
  payments,
}: {
  payments: PaymentType[];
}) {
  return (
    <div className="h-[400px] overflow-auto">
      <Table>
        <TableCaption>A list of your recent payments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Tipo de pago</TableHead>
            <TableHead>Número de Transacción</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Cantidad Pagada</TableHead>
            <TableHead>Categoría</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments && payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell>{payment.transaction_Number}</TableCell>
                <TableCell
                  className={`${
                    payment.status === "Pendiente"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {payment.status}
                </TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.amountPaid}</TableCell>
                <TableCell>{payment.category}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger className="w-10">
                      <ActionsIcons />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            ¿Qué quieres hacer con este pago?
                          </h4>
                        </div>
                        <div className="grid gap-2">
                          {payment.amount !== payment.amountPaid && (
                            <>
                              <Payment payment={payment} />
                              <UpdatePayment payment={payment} />
                            </>
                          )}
                          <DeletePayment paymentId={payment.id} />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No hay movimientos</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
