import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ProtectedRoute from "./ProtectedRoute";
import commonRoutes from "./commonRoutes";

const Dashboard = lazy(() => import("../features/Dashboard/Dashboard"))

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
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function FallBack() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid item>
        <h1>Loading...</h1>
      </Grid>
    </Grid>
  );
}
