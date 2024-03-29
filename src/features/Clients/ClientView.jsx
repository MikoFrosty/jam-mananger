import styles from "../../css/Client/ClientView.module.css";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchClients, getUser } from "../../StateManagement/Actions/actions";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ClientInvite from "./ClientInvite";
import AccountBar from "../Account/AccountBar";

import Tooltip from "@mui/material/Tooltip";

export default function ClientView({ type = "user" }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const [clientsRefetched, setClientsRefetched] = useState(false);
  const [deadHours, setDeadHours] = useState(null);
  const [deadHoursCalculated, setDeadHoursCalculated] = useState(true);
  const [totalBilled, setTotalBilled] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [billedIn, setBilledIn] = useState(null)
  const clients = useSelector((state) => state.app.clients);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user]);

  useEffect(() => {
    console.log(clients);
    console.log(user);
    if (clients && user) {
      console.log(clients);
      let these_dead_hours = 0;
      let these_billing_totals = 0;
      let these_total_hours = 0;

      clients.forEach((client) => {
        if (client.dead_hours) {
          these_dead_hours += client.dead_hours || 0;
          these_billing_totals += client.total_billable_hours || 0;
          these_total_hours += client.total_billable_hours || 0;
        }
      });

      console.log("We did it yeah yeah w did it");
      setDeadHours(these_dead_hours);
      if ((these_billing_totals * user.hourly_rate) > 1000) {
        these_billing_totals = (these_billing_totals / 1000).toFixed(1)
        setBilledIn("k")
      }
      setTotalBilled(these_billing_totals * user.hourly_rate);
      setTotalHours(these_billing_totals + these_dead_hours);
      setDeadHoursCalculated(true);
    }
  }, [clients, user]);

  useEffect(() => {
    if ((!clients || clients.length === 0) && !clientsRefetched) {
      dispatch(fetchClients());
      setClientsRefetched(true);
    }
  }, []);

  useEffect(() => {
    if (deadHours) {
      console.log(deadHours);
    }
    console.log(deadHoursCalculated);
  }, [deadHours, deadHoursCalculated]);

  return (
    <div className={styles.ClientView}>
      <div className={styles.ClientManagement}>
        <div className={styles.Metrics}>
          <AccountBar label={"Clients"} />
          <div className={styles.MetricsRow}>
            <div className={styles.Metric}>
              {deadHours !== null && deadHoursCalculated ? (
                <>
                  <Tooltip
                    title={
                      "Dead hours represent unbilled hours deducted from invoices. Invoices are billed in whole numbers only (e.g., 1, 2, or 3 hours)."
                    }
                  >
                    <Typography sx={{ width: "fit-content" }} variant="caption">
                      Dead Hours
                    </Typography>
                  </Tooltip>
                  <Typography sx={{ width: "fit-content" }} variant="h1">
                    {deadHours.toFixed(2)}
                  </Typography>
                </>
              ) : (
                <>
                  <Skeleton width={"200px"} height={"180px"} />
                </>
              )}
            </div>
            <div className={styles.Metric}>
              {deadHours && deadHoursCalculated ? (
                <>
                  <Tooltip
                    title={
                      "This number represents the total USD amount you have billed clients"
                    }
                  >
                    <Typography sx={{ width: "fit-content" }} variant="caption">
                      Total Billed
                    </Typography>
                  </Tooltip>
                  <Typography sx={{ width: "fit-content" }} variant="h1">
                    $ {(billedIn ? `${totalBilled.toFixed(1)} ${billedIn}` : `${totalBilled.toFixed(2)}`)}
                  </Typography>
                </>
              ) : (
                <>
                  <Skeleton width={"200px"} height={"180px"} />
                </>
              )}
            </div>
            <div className={styles.Metric}>
              {deadHours && deadHoursCalculated ? (
                <>
                  <Typography sx={{ width: "fit-content" }} variant="caption">
                    Hours Worked
                  </Typography>
                  <Typography sx={{ width: "fit-content" }} variant="h1">
                    {deadHours.toFixed(2)}
                  </Typography>
                </>
              ) : (
                <>
                  <Skeleton width={"200px"} height={"180px"} />
                </>
              )}
            </div>
          </div>
        </div>
        <ClientInvite />
      </div>
    </div>
  );
}
