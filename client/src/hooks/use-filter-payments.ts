import { orderBy } from "@/constants";
import type { Payment } from "@/types/payments";
import { useState } from "react";

const DEFAULT_FILTER_STATE = {
  type: "",
  status: "",
  query: "",
  sort: "",
};

export type FiltersValuesState = typeof DEFAULT_FILTER_STATE;

export default function useFilterPayments(initialPayments: Payment[]) {
  const [filterState, setFilterState] = useState<FiltersValuesState>(
    DEFAULT_FILTER_STATE
  );
  
  const updateFilterState = (newState: Partial<FiltersValuesState>) => {
    setFilterState((prev) => ({ ...prev, ...newState }));
  };

  const clearFilters = () => {
    setFilterState(DEFAULT_FILTER_STATE);
  };

  const applyFilters = (): Payment[] => {
    const { type, status, query, sort } = filterState;
    const filteredPayments = initialPayments.filter((payment) => {
      return (
        (!type || payment.type === type) &&
        (!status || payment.status === status) &&
        (!query ||
          payment.description.toLowerCase().includes(query.toLowerCase()))
      );
    });

    return sort === orderBy
      ? filteredPayments.sort((a, b) => a.amount - b.amount)
      : filteredPayments.sort((a, b) => a.amount + b.amount);
  };

  return {
    filterState,
    payments: applyFilters(),
    updateFilterState,
    clearFilters,
  };
}
