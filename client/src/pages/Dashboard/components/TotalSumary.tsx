import type { User } from "@/types/user";
import { memo } from "react";

export default memo(function TotalSummary({ user }: { user: User }) {
  const totalPaid = user?.payments.reduce(
    (acc, payment) => acc + payment.amountPaid,
    0
  );

  const totalToPay = user?.payments.reduce(
    (acc, payment) => acc + (payment.amount - payment.amountPaid),
    0
  );

  const total = totalPaid + totalToPay;

  return (
    <>
      <div className="flex flex-col space-y-3">
        <article className="flex justify-between w-[300px]">
          <div className="bg-white w-1/2 text-sm text-center py-2">
            TOTAL PAGADO
          </div>
          <div className="w-1/2 bg-[#0f172a] text-sm text-white text-center font-bold py-2">
            {totalPaid.toLocaleString()} ARS
          </div>
        </article>
        <article className="flex justify-between ">
          <div className="bg-white w-1/2 text-sm text-center py-2">
            TOTAL A PAGAR
          </div>
          <div className="w-1/2 bg-[#0f172a] text-sm text-center text-white font-bold py-2">
            {totalToPay.toLocaleString()} ARS
          </div>
        </article>
        <article className="flex justify-between ">
          <div className="bg-slate-300 w-1/2 text-sm text-center py-2">
            TOTAL
          </div>
          <div className="w-1/2 bg-[#0f172a] text-sm text-center text-white font-bold py-2">
            {total.toLocaleString()} ARS
          </div>
        </article>
      </div>
    </>
  );
});
