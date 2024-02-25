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

export default function ClientView({ type = "user" }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [clientsRefetched, setClientsRefetched] = useState(false);
  const [documentCount, setDocumentCount] = useState(0);
  const clients = useSelector((state) => state.app.clients);
  console.log("List of Clients", clients);
  const invitations = useSelector((state) => state.app.client_invitations);
  console.log(invitations);

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

  function sendClientInvite() {
    if (email !== "") {
      const payload = {
        client_email: email,
      };
      fetchWrapper(
        "/client-invitation",
        localStorage.getItem("token"),
        "POST",
        {
          ...payload,
        }
      ).then((res) => {
        if (res.message === "Client Invite Sent") {
          console.log("Sent Email to: ", email);
        }
      });
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <div className={styles.ClientView}>
      {type === "user" ? (
        !clients ? (
          <Skeleton width="100vw" height="100vh" />
        ) : (
          <div className={styles.ClientMain}>
            <div className={styles.Clients}>
              <Typography variant="caption">Clients</Typography>
              {clients.map((client) => {
                return (
                  <div className={styles.Client}>
                    <div className={styles.ClientColumn}>
                      <Typography variant="caption" color={"purple"}>
                        Status - Active
                      </Typography>
                      <Typography variant="h5">{client.client_name}</Typography>
                    </div>
                    <div className={styles.ClientColumn}>
                      <Typography variant="body1">
                        {client.client_poc.client_user_name.first}{" "}
                        {client.client_poc.client_user_name.last}
                      </Typography>
                      <Typography variant="body1">
                        {client.client_poc.client_user_email}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.ClientMetrics}>
              <Typography variant="caption">Metrics</Typography>
              <div className={styles.MetricHeader}>
                <div className={styles.MetricCard}>
                  <Typography alignSelf={"start"} variant="caption">
                    Client Count
                  </Typography>
                  <Typography variant="h2">{clients.length}</Typography>
                </div>
                <div className={styles.MetricCard}>
                  <Typography alignSelf={"start"} variant="caption">
                    Total Documents
                  </Typography>
                  <Typography variant="h2">{documentCount}</Typography>
                </div>
              </div>
              <div className={styles.MetricHeader}>
                <div className={styles.MetricCard}>
                  <Typography alignSelf={"start"} variant="caption">
                    Invite Clients
                  </Typography>
                  <div className={styles.ClientEmailRow}>
                    <TextField
                      onChange={(e) => handleEmailChange(e)}
                      className={styles.ClientEmailInput}
                      placeholder="Client Email"
                    />
                    <SendIcon
                      onClick={sendClientInvite}
                      className={styles.Icon}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{ overflowY: "scroll" }}
                className={styles.MetricHeader}
              >
                <div style={{ rowGap: "10px" }} className={styles.MetricCard}>
                  <Typography alignSelf={"start"} variant="caption">
                    Invitations
                  </Typography>
                  {invitations.map((invitation) => {
                    return (
                      <div className={styles.Client}>
                        <div className={styles.ClientColumn}>
                          <Typography variant="caption" color={"purple"}>
                            Status - {invitation.status}
                          </Typography>
                          <Typography variant="body1">
                            {invitation.client_email}
                          </Typography>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}
