import { Button, Input } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  query: string;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export default function PaymentFilter({
  query,
  onTypeChange,
  onStatusChange,
  onQueryChange,
  onSortChange,
}: Props) {
  return (
    <>
      <div className="flex justify-center space-x-3">
        <Select onValueChange={onTypeChange}>
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

        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px] text-black">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="Completado">Completado</SelectItem>
          </SelectContent>
        </Select>
        {/* 
        <Input
          type="checkbox"
          placeholder="Ordenar"
          className="border rounded"
          onChange={(e) => onSortChange(e.target.checked)}
        /> */}

        <Select onValueChange={onSortChange}>
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
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <Button>Filtrar</Button>
      </div>
    </>
  );
}
