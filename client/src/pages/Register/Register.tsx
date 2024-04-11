import { InputForm } from "@/components";
import { Button } from "@/components/ui/button";
import api from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/user.store";
import { registerSchema } from "@/utils";
import { PrivateRoutes } from "@/model/routes";

const DEFAULT_VALUES_FORM_REGISTER = {
  name: "",
  email: "",
  password: "",
} as const;

type RegisterForm = typeof DEFAULT_VALUES_FORM_REGISTER;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: DEFAULT_VALUES_FORM_REGISTER,
  });
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();
 
  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await api.signUp(data);
      if (res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        reset();
        navigate(PrivateRoutes.DASHBOARD);
      }
    } catch (error) {
      toast.error("ocurrio un error al registrar usuario");
    }
  };

  return (
    <>
      <main>
        <div className="flex justify-center items-center h-screen bg-gray-200">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Crea una cuenta
            </h2>

            <InputForm
              label="Nombre"
              id="name"
              {...register("name")}
              error={errors.name}
            />

            <InputForm
              label="Email"
              id="email"
              {...register("email")}
              error={errors.name}
            />

            <InputForm
              label="Password"
              id="password"
              {...register("password")}
              error={errors.name}
            />

            <div className="flex items-center justify-center">
              <Button>Registrar</Button>
            </div>
            <div className="flex items-center justify-center mt-6">
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                ¿Ya tienes una cuenta?
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
