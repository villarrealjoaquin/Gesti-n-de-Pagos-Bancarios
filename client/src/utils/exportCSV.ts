import { Parser } from "@json2csv/plainjs";
import type { Payment } from "@/types/payments";

export const exportCSV = (data: Payment[]) => {
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "payments.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
