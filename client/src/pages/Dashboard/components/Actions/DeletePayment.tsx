import { Button } from "@/components";
import api from "@/services/payment.service";
import { useAuthStore } from "@/store/user.store";
import { toast } from "sonner";

export default function DeletePayment({ paymentId }: { paymentId: number }) {
  const deletePaymentFromUser = useAuthStore(
    (state) => state.deletePaymentFromUser
  );
  const token = useAuthStore((state) => state.token);

  const deletePayment = async (paymentId: number) => {
    try {
      const res = await api.deletePayment(Number(paymentId), token);
      if (res.data) {
        toast.success("Pago eliminado");
        deletePaymentFromUser(paymentId);
      }
    } catch (error) {
      toast.error("Error al eliminar el pago");
    }
  };

  return (
    <>
      <div className="grid gap-4">
        <Button onClick={() => deletePayment(paymentId)}>Eliminar</Button>
      </div>
    </>
  );
}
