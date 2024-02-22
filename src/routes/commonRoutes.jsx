import TermsAndConditions from "../components/regulatory/terms";
import Landing from "../pages/Landing.jsx";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import ClientSignup from "../pages/ClientSignup.jsx";
import ClientAdmin from "../pages/ClientAdmin.jsx";
import ClientTeam from "../pages/ClientTeam.jsx";
import TeamSignup from "../pages/TeamSignup.jsx";
import PublicDocs from "../pages/PublicDocs.jsx";
// import Pricing from "../features/LandingPage/pricing";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";



// const stripePromise = loadStripe(
//   "pk_test_51OU8cxDhEC7QrbhyXNDZFKnFjl1rM9eqZElMdnx5tqaw2xDrCmAH4InT78qJO7V88S2HihXphcY2xA6Ff3mMvNtv00SgSHNfGL"
// );

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
  // {
  //   path: "about-us",
  //   element: <AboutUs />,
  //   children: <></>,
  // },
  // {
  //   path: "pricing",
  //   element: (
  //     <Elements stripe={stripePromise}>
  //       <Pricing />
  //     </Elements>
  //   ),
  //   children: <></>,
  // },
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
    children: <></>,
  },
  {
    path: "team-signup",
    element: <TeamSignup />,
    children: <></>,
  },
  {
    path: "public-docs",
    element: <PublicDocs />,
    children: <></>,
  },
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
