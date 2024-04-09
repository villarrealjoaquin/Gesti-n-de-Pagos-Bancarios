import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./model/routes";
import { RouterWithNotFound } from "./utils/RouterWithNotFound";
import { useVerifyAuthToken } from "./hooks";
import { AuthGuard } from "./utils";

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

function App() {
  useVerifyAuthToken();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterWithNotFound>
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route path={PublicRoutes.REGISTER} element={<Register />} />
          <Route element={<AuthGuard />}>
            <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
          </Route>
        </RouterWithNotFound>
      </Suspense>
    </>
  );
}

export default App;
