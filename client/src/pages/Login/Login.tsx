import { InputForm } from "@/components";
import { Button } from "@/components/ui/button";
import { PrivateRoutes } from "@/model/routes";
import api from "@/services/auth.service";
import { useAuthStore } from "@/store/user.store";
import { loginSchema } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DEFAULT_VALUES_FORM_LOGIN = {
  email: "",
  password: "",
} as const;

type DataLoginForm = typeof DEFAULT_VALUES_FORM_LOGIN;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES_FORM_LOGIN,
  });
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const navigate = useNavigate();

  const onSubmit = async (data: DataLoginForm) => {
    try {
      const res = await api.signIn(data);
      if (res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        setIsAuthenticated(true);
        reset();
        navigate(PrivateRoutes.DASHBOARD);
      }
    } catch (error) {
      toast.error("ocurrio un error al iniciar sesión");
    }
  };

  return (
    <>
      <main>
        <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Inicia sesión
            </h2>

            <InputForm
              label="Email"
              id="email"
              type="email"
              {...register("email")}
              error={errors.email}
            />

            <InputForm
              label="Password"
              id="password"
              type="password"
              {...register("password")}
              error={errors.password}
            />

            <div className="flex items-center justify-center">
              <Button>Iniciar sesión</Button>
            </div>
            <div className="flex items-center justify-center mt-6">
              <Link
                to="/register"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                ¿No tienes cuenta?
              </Link>
            </div>
          </form>
          <p className="text-center text-xs w-1/3 text-gray-700 mb-4 mt-6">
            Dado que el backend está desplegado en Render, es importante tener
            en cuenta la advertencia que indica: "Su instancia gratuita dejará
            de funcionar debido a la inactividad, lo que puede retrasar las
            solicitudes 50 segundos o más". Si experimentas problemas al iniciar
            sesion, es posible que solo necesites esperar mientras la instancia
            se reactiva.
          </p>
        </div>
      </main>
    </>
  );
}
