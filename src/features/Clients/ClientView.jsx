import TextField from "@mui/material/TextField";
import styles from "../../css/Client/ClientView.module.css";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import fetchWrapper from "../../utils/fetchWrapper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchClients } from "../../StateManagement/Actions/actions";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ClientInvite from "./ClientInvite";

export default function ClientView({ type = "user" }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [clientsRefetched, setClientsRefetched] = useState(false);
  const [documentCount, setDocumentCount] = useState(0);
  const clients = useSelector((state) => state.app.clients);
  const invitations = useSelector((state) => state.app.client_invitations);

  useEffect(() => {
    if (clients) {
      let totalDocuments = clients.reduce((total, current) => {
        // Check if the "documents" key exists in the current object
        if (current.documents && Array.isArray(current.documents)) {
          // Add the length of the "documents" array to the total
          return total + current.documents.length;
        }
        // If the current object doesn't have a "documents" key, just return the current total
        return total;
      }, 0); // Initialize total as 0

      setDocumentCount(totalDocuments);
    }
  }, [clients]);

  useEffect(() => {
    if ((!clients || clients.length === 0) && !clientsRefetched) {
      dispatch(fetchClients());
      setClientsRefetched(true);
    }
  }, []);

  return (
    <div className={styles.ClientView}>
      <div className={styles.ClientManagement}>
        <div className={styles.Metrics}>
          <div className={styles.MetricHeader}>
            <Typography variant="caption">Finances</Typography>
          </div>
          <div className={styles.MetricsRow}>
            <div className={styles.Metric}></div>
            <div className={styles.Metric}></div>
            <div className={styles.Metric}></div>
          </div>
        </div>
        <ClientInvite />
      </div>
    </div>
  );
}
