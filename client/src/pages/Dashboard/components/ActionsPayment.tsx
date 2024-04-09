import { Button } from "@/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import api from "@/services/payment.service";
import { useAuthStore } from "@/store/user.store";

export default function ActionsPayment() {
  const user = useAuthStore((state) => state.user);
  // const setUser = useAuthStore((state) => state.setUser);

  const deletePayment = async () => {
    try {
      const res = await api.deletePayment(Number(user?.id));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Ver mas</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">
                Que quieres hacer con este pago?
              </h4>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                {/* {payment.description} */}
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-4">
                <Button>Pagar</Button>
              </div>
              <div className="grid gap-4">
                <Button onClick={deletePayment}>Eliminar</Button>
              </div>
              <div className="grid gap-4">
                <Button>Editar</Button>
              </div>
              <div className="grid gap-4">
                <Button>Pagar</Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
