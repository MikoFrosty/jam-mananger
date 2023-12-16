import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import { useContext } from "react";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
}
