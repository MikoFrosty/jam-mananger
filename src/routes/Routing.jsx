import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ProtectedRoute from "./ProtectedRoute";
import commonRoutes from "./commonRoutes";

//import StyledContainerMainWithOutlet from '@/pages/LayoutComponents/StyledContainerMainWithOutlet';
//import StyledContainerModiimapWithOutlet from '@/pages/LayoutComponents/StyledContainerModiimapWithOutlet';
//const Modiimap = lazy(() => import('@/pages/Modiimap/Modiimap'));

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
          {/* <Route path="/" element={<Index />} />
          <Route path="/:jurisdictionSlug" element={<Index />} />
          <Route path="/:jurisdictionSlug/area/:areaId" element={<Index />} />
          <Route path="button-example" element={<ButtonExample />} /> */}
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
