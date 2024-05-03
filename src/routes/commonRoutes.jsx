import TermsAndConditions from "../components/regulatory/terms";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import ClientSignup from "../pages/ClientSignup.jsx";
import ClientAdmin from "../pages/ClientAdmin.jsx";
import ClientTeam from "../pages/ClientTeam.jsx";
import TeamSignup from "../pages/TeamSignup.jsx";
import PublicDocs from "../pages/PublicDocs.jsx";
import ClientLogin from "../pages/ClientLogin.jsx";
import ClientDashboard from "../features/Clients/ClientDashboard.jsx";
import PostStripe from "../pages/PostStripe.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import SignupFlow from "../pages/SignupFlow";
// import Pricing from "../features/LandingPage/pricing";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import ClientAccountSignup from '../pages/ClientAccount';
import BusinessDashboard from '../pages/KamariDashboard';
import FindWork from "../pages/FindWork";
import Authenticate from "../pages/Signup.jsx";
import Landing from "../pages/Landing.jsx";
import LandingVariation from "../pages/LandingVariation.jsx";

// const stripePromise = loadStripe(
//   "pk_test_51OU8cxDhEC7QrbhyXNDZFKnFjl1rM9eqZElMdnx5tqaw2xDrCmAH4InT78qJO7V88S2HihXphcY2xA6Ff3mMvNtv00SgSHNfGL"
// );

const commonRoutes = [
  {
    path: "landing/variation/1",
    element: <Landing />,
    children: <></>
  },
  {
    path: "landing/variation/2",
    element: <LandingVariation />,
    children: <></>
  },
  // {
  //   path: "login",
  //   element: <Login />,
  //   children: <></>,
  // },
  // {
  //   path: "signup",
  //   element: <Signup />,
  //   children: <></>,
  // },
  // {
  //   path: "client-login",
  //   element: <ClientLogin />,
  //   children: <></>,
  // },
  // {
  //   path: "client-dashboard",
  //   element: <ClientDashboard />,
  //   children: <></>,
  // },
  // {
  //   path: "terms-and-conditions",
  //   element: <TermsAndConditions />,
  //   children: <></>,
  // },
  // {
  //   path: "client-account",
  //   element: <ClientAccountSignup />,
  //   children: <></>
  // },
  // {
  //   path: "client-signup",
  //   element: <ClientSignup />,
  //   children: <></>,
  // },
  // {
  //   path: "client-admin",
  //   element: <ClientAdmin />,
  //   children: <></>,
  // },
  // {
  //   path: "client-team",
  //   element: <ClientTeam />,
  //   children: <></>,
  // },
  // {
  //   path: "team-signup",
  //   element: <TeamSignup />,
  //   children: <></>,
  // },
  // {
  //   path: "public-docs",
  //   element: <PublicDocs />,
  //   children: <></>,
  // },
  // {
  //   path: "post-stripe",
  //   element: <PostStripe />,
  //   children: <></>,
  // },
  // {
  //   path: "forgot-password",
  //   element: <ForgotPassword />,
  //   children: <></>,
  // },
  // {
  //   path: "authenticate",
  //   element: <Authenticate />,
  //   children: <></>,
  // },
  // {
  //   path: "business-dashboard",
  //   element: <BusinessDashboard />,
  //   children: <></>
  // },
  // {
  //   path: "find-work",
  //   element: <FindWork />,
  //   children: <></>
  // }
];

export default commonRoutes;
