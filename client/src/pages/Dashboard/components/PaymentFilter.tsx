import { Input } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FiltersValuesState } from "@/hooks/use-filter-payments";

type Props = {
  filterState: FiltersValuesState;
  updateFilterState: (value: Partial<FiltersValuesState>) => void;
};

export default function PaymentFilter({
  filterState,
  updateFilterState,
}: Props) {
  return (
    <>
      <Select
        onValueChange={(value: string) => updateFilterState({ type: value })}
      >
        <SelectTrigger className="w-[180px] text-black">
          <SelectValue placeholder="Seleccionar Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="factura">Factura</SelectItem>
          <SelectItem value="transferencia">transferencia</SelectItem>
          <SelectItem value="Compra">Compra</SelectItem>
          <SelectItem value="tarjeta">Tarjeta de Crédito</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value: string) => updateFilterState({ status: value })}
      >
        <SelectTrigger className="w-[180px] text-black">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pendiente">Pendiente</SelectItem>
          <SelectItem value="Completado">Completado</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value: string) => updateFilterState({ sort: value })}
      >
        <SelectTrigger className="w-[180px] text-black">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Menor a Mayor</SelectItem>
          <SelectItem value="desc">Mayor a Menor</SelectItem>
        </SelectContent>
      </Select>

      <div className="mb-3">
        <Input
          type="text"
          placeholder="Buscar pago"
          value={filterState.query}
          onChange={(e) => updateFilterState({ query: e.target.value })}
          className="border rounded p-2 w-full"
        />
      </div>
    </>
  );
}
