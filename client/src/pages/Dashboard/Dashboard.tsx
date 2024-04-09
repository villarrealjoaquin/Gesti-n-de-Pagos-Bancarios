import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { exportCSV } from "@/helpers/exportCSV";
import { useAuthStore } from "@/store/user.store";
import { Payment as PaymentType } from "@/types/payments";
import {
  AddPayment,
  DeletePayment,
  Payment,
  UpdatePayment,
} from "./components";
import ActionsIcons from "./components/ActionsIcons";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components";

function Dashboard() {
  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const user = useAuthStore((state) => state.user);

  const filteredPayments = useMemo(() => {
    return user?.payments.filter((payment) => {
      return (
        (type === "" || payment.type === type) &&
        (status === "" || payment.status === status) &&
        (query === "" ||
          payment.description.toLowerCase().includes(query.toLowerCase()))
      );
    });
  }, [type, status, user?.payments, query]);

  return (
    <>
      <header className="flex flex-col items-center gap-3 text-center mt-5">
        <h1 className="text-4xl">¡Bienvenido, {user?.name}!</h1>
        <h2 className="text-2xl">Tu resumen mensual</h2>
        <p>
          Aquí puedes encontrar un resumen de tus movimientos{" "}
          <span className="font-bold">realizados este mes</span>.
        </p>
      </header>
      <main className="p-5">
        <section className="p-5">
          <h3 className="text-2xl my-3 font-bold">Filtrar Movimientos</h3>
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

            <Select onValueChange={setStatus}>
              <SelectTrigger className="w-[180px] text-black">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
              </SelectContent>
            </Select>

            <div className="mb-3">
              <Input
                type="text"
                placeholder="Buscar por descripción, número de transacción, etc."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>
            <Button>Filtrar</Button>
          </div>

          <AddPayment />

          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
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
              {filteredPayments && filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
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
                    <TableCell>{payment.amountPaid}</TableCell>{" "}
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
        </section>
        <section className="flex justify-between px-10">
          <Button
            className="w-[180px] px-3"
            onClick={() => exportCSV(user?.payments as PaymentType[])}
          >
            Exportar{" "}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>

          <div className="flex flex-col space-y-3">
            <article className="flex justify-between w-[300px]">
              <div className="bg-white w-1/2 text-sm text-center py-2">
                TOTAL COBROS
              </div>
              <div className="w-1/2 bg-[#0f172a] text-sm text-white text-center font-bold py-2">
                3.452.000 ARS
              </div>
            </article>
            <article className="flex justify-between ">
              <div className="bg-white w-1/2 text-sm text-center py-2">
                TOTAL PAGOS
              </div>
              <div className="w-1/2 bg-[#0f172a] text-sm text-center text-white font-bold py-2">
                -1.788.180 ARS
              </div>
            </article>
            <article className="flex justify-between ">
              <div className="bg-slate-300 w-1/2 text-sm text-center py-2">
                TOTAL
              </div>
              <div className="w-1/2 bg-[#0f172a] text-sm text-center text-white font-bold py-2">
                1.663.820 ARS
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
