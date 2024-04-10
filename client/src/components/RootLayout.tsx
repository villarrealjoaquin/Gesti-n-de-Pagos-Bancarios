import { useAuthStore } from "@/store/user.store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <header className="flex flex-col items-center gap-3 text-center mt-5">
        <h1 className="text-4xl">¡Bienvenido, {user?.name}!</h1>
        <h2 className="text-2xl">Tu resumen mensual</h2>
        <p>
          Aquí puedes encontrar un resumen de tus movimientos{" "}
          <span className="font-bold">realizados este mes</span>.
        </p>
      </header>
      {children}
      <footer className="w-full h-full">
        <p className="text-xs text-center">
          © 2024. Todos los derechos reservados. 
        </p>
      </footer>
    </>
  );
}
