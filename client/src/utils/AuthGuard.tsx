import { useAuthStore } from "@/store/user.store";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  
  if (isLoading) return <></>;

  return !isLoading && isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to="/login" />
  );
};
