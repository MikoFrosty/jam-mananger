import styles from "../../css/Account/ProfileSettings.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import fetchWrapper from "../../utils/fetchWrapper";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrganization } from "../../StateManagement/Actions/actions";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const organization = useSelector((state) => state.app.organization);
  const isAdmin = organization?.admins?.some(
    (admin) => admin.email === user?.email
  );
  const isBillableUser = organization?.billable_user.email === user?.email;
  const [isLoading, setIsLoading] = useState(false);
  const [orgLoaded, setOrgLoaded] = useState(false);
  const [showStripeError, setShowStripeError] = useState(false);

  useEffect(() => {
    console.log("org", organization);
    dispatch(getOrganization());
  }, []);

  useEffect(() => {
    if (organization) {
      setOrgLoaded(true);
    }
  }, [organization]);

  useEffect(() => {
    if (organization?.stripe_account) {
      console.log(organization.stripe_account);
    }
  }, []);

  const taggedData = {
    admin: {
      backgroundColor: "rgba(46, 196, 182, 0.3)",
      padding: "5px",
      borderRadius: "5px",
    },
    standard: {
      backgroundColor: "rgba(255, 201, 20, 0.3)",
      padding: "5px",
      borderRadius: "5px",
    },
    tag: {
      backgroundColor: "#5fa9fda1",
      padding: "5px",
      borderRadius: "5px",
    },
    alert: {
      backgroundColor: "rgba(245, 81, 31, 0.3)",
      padding: "5px",
      borderRadius: "5px",
    },
  };

  function createStripeConnectAccount() {
    setIsLoading(true);
    fetchWrapper(
      "/create-connect-account",
      localStorage.getItem("token"),
      "POST"
    ).then((res) => {
      setIsLoading(false);
      window.location.replace(res.connect_url);
    });
  }

  function handleNavigate(destination) {
    if (destination === "stripe") {
      setIsLoading(true);
      fetchWrapper(
        "/create-login-link",
        localStorage.getItem("token"),
        "POST"
      ).then((res) => {
        if (!res.connect_url) {
          setShowStripeError(true);
        } else {
          window.open(res.connect_url.url);
        }
        setIsLoading(false);
      });
    }
  }

  // conditionally render stripe connect button if org is loaded
  // and there is no stripe account on the org

  return (
    <div className={styles.ProfileSettings}>
      <div className={styles.Payouts}>
        <Typography variant="h5">Payouts</Typography>
        <div className={styles.StripePayout}>
          <Typography variant="body1">Get Paid With Stripe</Typography>
          <div className={styles.IntegrationButtonRow}>
            {orgLoaded && !organization.stripe_account ? (
              <button
                className={styles.IntegrateButton}
                onClick={() => createStripeConnectAccount()}
              >
                Connect Stripe
              </button>
            ) : orgLoaded && organization.stripe_account ? (
              <div className={styles.StripeConnectLogin}>
                <Typography variant="caption">
                  You are connected with stripe!
                </Typography>
                <button
                  className={styles.IntegrateButton}
                  onClick={() => handleNavigate("stripe")}
                >
                  Stripe Dashboard
                </button>
                {showStripeError ? (
                  <Typography color={"#ff000090"} variant="caption">
                    Please check your email to complete your account setup
                  </Typography>
                ) : null}
              </div>
            ) : (
              <Skeleton width="100%" height="36px" />
            )}
            {isLoading ? (
              <CircularProgress
                style={{
                  color: "dodgerblue",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                }}
                size={50}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.PayPalPayout}>
          <Typography variant="body1">Get Paid With PayPal</Typography>
          <Typography variant="caption">Coming soon</Typography>
          {/* <div className={styles.IntegrationButtonRow}>
            {orgLoaded && !organization.paypal_account ? (
              <button
                className={styles.IntegrateButton}
                onClick={() => createStripeConnectAccount()}
              >
                Connect Stripe
              </button>
            ) : orgLoaded && organization.stripe_account ? (
              <div className={styles.StripeConnectLogin}>
                <Typography variant="caption">
                  You are connected with stripe!
                </Typography>
                <button className={styles.IntegrateButton} onClick={() => handleNavigate("stripe")}>
                  Stripe Dashboard
                </button>
                {showStripeError ? (
                  <Typography color={"#ff000090"} variant="caption">
                    Please check your email to complete your account setup
                  </Typography>
                ) : null}
              </div>
            ) : (
              <Skeleton width="100%" height="36px" />
            )}
            {isLoading ? (
              <CircularProgress
                style={{
                  color: "dodgerblue",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                }}
                size={50}
              />
            ) : null}
          </div> */}
        </div>
      </div>
    </div>
  );
}
