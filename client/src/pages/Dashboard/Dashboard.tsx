import { ExportCSVIcon, RootLayout } from "@/components";
import { Button } from "@/components/ui/button";
import useFilterPayments from "@/hooks/use-filter-payments";
import { useAuthStore } from "@/store/user.store";
import { exportCSV } from "@/utils/exportCSV";
import {
  AddPayment,
  PaymentFilter,
  PaymentTable,
  TotalSumary,
} from "./components";

function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { 
    filterState, 
    payments,
    updateFilterState, 
    clearFilters, 
  } = useFilterPayments(user?.payments || []);

  if (!user) return null;

  return (
    <>
      <RootLayout>
        <main className="p-5">
          <section>
            <h3 className="text-2xl my-3 font-bold">Filtrar Movimientos</h3>
            <div className="flex justify-center space-x-3">
              <PaymentFilter
                filterState={filterState}
                updateFilterState={updateFilterState}
              />
              <Button onClick={clearFilters}>Resetear</Button>
            </div>
            <div className="flex justify-between mb-3">
              <h3 className="text-2xl font-bold">Movimientos</h3>
              <AddPayment />
            </div>
            <div className="h-[400px]">
              <PaymentTable payments={payments} />
            </div>
          </section>
          <section className="flex justify-between px-10">
            <Button
              className="w-[180px] px-3"
              onClick={() => exportCSV(user.payments)}
            >
              Exportar <ExportCSVIcon />
            </Button>
            <TotalSumary user={user} />
          </section>
        </main>
      </RootLayout>
    </>
  );
}

export default Dashboard;
