import { PrivateRoutes } from "@/model/routes";
import api from "@/services/auth.service";
import { useAuthStore } from "@/store/user.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useVerifyAuthToken() {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore((state) => state.setisLoading);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          const { data } = await api.verifyTokenRequest(token);
          setIsAuthenticated(true);
          setUser(data);
          navigate(PrivateRoutes.DASHBOARD);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    verifyToken();
  }, [setIsAuthenticated, setUser, setIsLoading, token, navigate]);
}
