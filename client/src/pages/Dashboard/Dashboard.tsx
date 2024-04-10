import { ExportCSVIcon, RootLayout } from "@/components";
import { Button } from "@/components/ui/button";
import { exportCSV } from "@/helpers/exportCSV";
import { useAuthStore } from "@/store/user.store";
import { Payment } from "@/types/payments";
import { useState } from "react";
import { AddPayment, PaymentFilter, PaymentTable } from "./components";
import TotalSumary from "./components/TotalSumary";

function Dashboard() {
  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const user = useAuthStore((state) => state.user);

  const filteredPayments = (): Payment[] => {
    return (
      user?.payments.filter((payment) => {
        return (
          (type === "" || payment.type === type) &&
          (status === "" || payment.status === status) &&
          (query === "" ||
            payment.description === query ||
            payment.description.toLowerCase().includes(query.toLowerCase()))
        );
      }) || []
    );
  };

  const sortedPayments = sort === "asc"
      ? [...filteredPayments()].sort((a, b) => a.amount - b.amount)
      : [...filteredPayments()];

  return (
    <>
      <RootLayout>
        <main className="p-5">
          <section className="p-5">
            <h3 className="text-2xl my-3 font-bold text-center">
              Filtrar Movimientos
            </h3>
            <PaymentFilter
              query={query}
              onSortChange={setSort}
              onTypeChange={setType}
              onStatusChange={setStatus}
              onQueryChange={setQuery}
            />
            <div className="flex justify-between mb-3">
              <h3 className="text-2xl font-bold">Movimientos</h3>
              <AddPayment />
            </div>
            <div className="h-[400px]">
              <PaymentTable payments={sortedPayments} />
            </div>
          </section>
          <section className="flex justify-between px-10">
            <Button
              className="w-[180px] px-3"
              onClick={() => exportCSV(user?.payments as Payment[])}
            >
              Exportar <ExportCSVIcon />
            </Button>

            <TotalSumary />

            <div className="flex flex-col space-y-3">
              <article className="flex justify-between w-[300px]">
                <div className="bg-white w-1/2 text-sm text-center py-2">
                  TOTAL PAGADO
                </div>
                <div className="w-1/2 bg-[#0f172a] text-sm text-white text-center font-bold py-2">
                  3.452.000 ARS
                </div>
              </article>
              <article className="flex justify-between ">
                <div className="bg-white w-1/2 text-sm text-center py-2">
                  TOTAL GASTOS
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
      </RootLayout>
    </>
  );
}

export default Dashboard;
