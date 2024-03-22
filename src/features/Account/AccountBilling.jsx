import { useSelector } from "react-redux";
import styles from "../../css/Account/AccountBilling.module.css";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrganization } from "../../StateManagement/Actions/actions";
import CircularProgress from "@mui/material/CircularProgress";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import convert from "../../utils/dates/convertDates";
import fetchWrapper from "../../utils/fetchWrapper";

export default function AccountBilling() {
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.app.organization);
  const [orgBilling, setOrgBilling] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!organization) {
      dispatch(getOrganization());
    } else {
      if (organization.billing.id) {
        setOrgBilling(organization.billing); // Set orgBilling when available
        console.log(organization.billing);
      }
    }
  }, [organization]);

  function handleNavigate(destination) {
    if (destination === "stripe") {
      setIsLoading(true)
      fetchWrapper(
        "/create-customer-portal",
        localStorage.getItem("token"),
        "POST"
      ).then((res) => {
        window.open(res.connect_url.url);
        setIsLoading(false)
      });
    }
  }

  return (
    <div className={styles.AccountBilling}>
      {orgBilling?.status === "trialing" ? (
        <div className={styles.BillingAlert}>
          <Typography variant="caption">
            You are subscribed to the trial version of Kamari
          </Typography>
          <Typography variant="body1">
            Your organization's trial ends on
            {
              <Typography variant="body1" color={"green"}>
                {`${convert.unixToDate(orgBilling.trial_end)}`}
              </Typography>
            }
          </Typography>
        </div>
      ) : null}
      <div className={styles.PeriodInformation}>
        {orgBilling ? (
          <div className={styles.BillingInfoRow}>
            <div className={styles.BillingInfoGroup}>
              <Typography variant="caption">Billing Period Start</Typography>
              <Typography variant="body2">{`${convert.unixToDate(
                orgBilling.current_period_start
              )}`}</Typography>
            </div>
            <div className={styles.BillingInfoGroup}>
              <Typography variant="caption">Billing Period End</Typography>
              <Typography variant="body2">{`${convert.unixToDate(
                orgBilling.current_period_end
              )}`}</Typography>
            </div>
          </div>
        ) : (
          <div className={styles.BillingInfoGroup}>
            <Skeleton width="400px" height="26px" />
            <Skeleton width="400px" height="26px" />
          </div>
        )}
      </div>
      {orgBilling ? (
        <div className={styles.BillingInfoGroup}>
          <Typography variant="caption">Manage Your Subscription</Typography>
          <button
            onClick={() => handleNavigate("stripe")}
            className={styles.IntegrateButton}
          >
            Manage with Stripe
          </button>
        </div>
      ) : null}
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
  );
}
