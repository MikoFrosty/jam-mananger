import TermsAndConditions from "../components/regulatory/terms";
import Pricing from "../features/LandingPage/pricing";
import Landing from "../pages/Landing.jsx";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import ClientSignup from "../pages/ClientSignup.jsx";
import ClientAdmin from "../pages/ClientAdmin.jsx";
import ClientTeam from "../pages/ClientTeam.jsx";

const commonRoutes = [
  {
    path: "login",
    element: <Login />,
    children: <></>,
  },
  {
    path: "home",
    element: <Landing />,
    children: <></>,
  },
  {
    path: "signup",
    element: <Signup />,
    children: <></>,
  },
  {
    path: "pricing",
    element: <Pricing />,
    children: <></>,
  },
  {
    path: "about-us",
    element: <Pricing />,
    children: <></>,
  },
  {
    path: "terms-and-conditions",
    element: <TermsAndConditions />,
    children: <></>,
  },
  {
    path: "client-signup",
    element: <ClientSignup />,
    children: <></>,
  },
  {
    path: "client-admin",
    element: <ClientAdmin />,
    children: <></>,
  },
  {
    path: "client-team",
    element: <ClientTeam />,
    children: <></>
  }
  // {
  //   path: 'reset-password',
  //   element: <ResetPassword />,
  //   children: <></>,
  // },
  // {
  //   path: 'unauthorized',
  //   element: <Unauthorized />,
  //   children: <></>,
  // },
  // {
  //   path: 'profile',
  //   element: <ProtectedRoute />,
  //   children: <Route index element={<Profile />} />,
  // },
  // {
  //   path: '*',
  //   element: <ProtectedRoute />,
  //   children: <Route index element={<NotFound />} />,
  // },
];

export default commonRoutes;
