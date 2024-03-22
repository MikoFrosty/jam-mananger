import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ProtectedRoute from "./ProtectedRoute";
import commonRoutes from "./commonRoutes";
import CircularProgress from "@mui/material/CircularProgress";


const Dashboard = lazy(() => import("../features/Dashboard/Dashboard"));

export default function Routing() {
  return (
    <Suspense fallback={<FallBack />}>
      <Routes>
        {commonRoutes.map((route, index) => {
          const { children, ...rest } = route;
          return (
            <Route key={index} {...rest}>
              {children}
            </Route>
          );
        })}

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard type={"user"} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function FallBack() {
  return (
    <CircularProgress
      style={{
        color: "dodgerblue",
        position: "absolute",
        left: "50%",
        top: "50%",
      }}
      size={50}
    />
  );
}
