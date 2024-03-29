import { useSelector } from "react-redux";
import styles from "../../css/Client/ClientInvite.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchClients } from "../../StateManagement/Actions/actions";

import Typography from "@mui/material/Typography";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import fetchWrapper from "../../utils/fetchWrapper";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ClientInvite() {
  const dispatch = useDispatch();
  const [clientsFetched, setClientsFetched] = useState(false);
  const [clientInvitesFetched, setClientInvitesFetched] = useState(false);
  const [refreshSend, setRefreshSend] = useState(false);
  const [email, setEmail] = useState(null);
  const [filteredInvites, setFilteredInvites] = useState([]);
  const [refetchAll, setRefetchAll] = useState(false);
  const clients = useSelector((state) => state.app.clients);
  const clientInvites = useSelector((state) => state.app.client_invitations);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (
      (!clients && !clientInvites) && !clientsFetched
    ) {
      dispatch(fetchClients());
      setClientsFetched(true);
      setClientInvitesFetched(true);
    } else if (clientInvites && clients) {
      setClientsFetched(true);
      setClientInvitesFetched(true);
    }
    console.log("Client Invites", clientInvites);
  }, [clients, clientInvites]);

  function notify(message) {
    toast(message, {
      className: styles.SmallToast,
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
  }

  console.log("Filtered Invites", filteredInvites);

  useEffect(() => {
    if (clientInvites && email) {
      const filteredClientInvites = clientInvites.filter((invite) =>
        invite.client_email.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredInvites(filteredClientInvites);
    } else if ((clientInvites && !email) || (clientInvites && email === "")) {
      const filteredClientInvites = clientInvites.filter((invite) => invite);
      setFilteredInvites(filteredClientInvites);
    }
  }, [email, clientInvites]);

  useEffect(() => {
    if (refetchAll) {
      dispatch(fetchClients());
      setRefetchAll(false);
    }
  }, [refetchAll]);

  useEffect(() => {
    console.log(clientInvitesFetched);
  }, []);

  useEffect(() => {
    if (refreshSend) {
      sendClientInvite();
    }
  }, [refreshSend]);

  function sendClientInvite() {
    if (email && email !== "") {
      const payload = {
        client_email: email,
        refreshSend,
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
          setRefetchAll(true);
          setEmail(null);
          notify("Client invitation sent");
        }
      });
    } else {
      notify("Enter an email to invite clients");
    }
  }

  function handleExpandToggle(val) {
    setExpanded(val);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function sendRefreshInvite(inviteeEmail) {
    setEmail(inviteeEmail);
    setRefreshSend(true);
  }

  return (
    <div className={styles.ClientInvite}>
      {expanded ? (
        <KeyboardArrowUpIcon
          onClick={() => handleExpandToggle(false)}
          className={styles.Icon}
          sx={{ alignSelf: "end", backgroundColor: "rgba(255, 201, 20, 0.3)" }}
        />
      ) : (
        <KeyboardArrowDownIcon
          onClick={() => handleExpandToggle(true)}
          className={styles.Icon}
          sx={{ alignSelf: "end", backgroundColor: "rgba(255, 201, 20, 0.3)" }}
        />
      )}
      <div className={styles.SprintInput}>
        <label className={styles.SprintLabel}>Invite Clients</label>
        <input
          onChange={(e) => handleEmailChange(e)}
          type="email"
          className={styles.SprintTitleInput}
        />
        <button
          onClick={() => sendClientInvite()}
          className={styles.ClientInviteButton}
        >
          Send Invite
        </button>
      </div>
      {expanded ? (
        !clientsFetched && !clientInvitesFetched ? (
          <div className={styles.SprintInput}>
            <label className={styles.SprintLabel}>Client Invites</label>
            <div className={styles.InvitedClientSkeleton}>
              <div style={{ width: "65%" }}>
                <Skeleton width="100%" height="36px" />
              </div>
              <div style={{ width: "35%" }}>
                <Skeleton width="100%" height="36px" />
              </div>
            </div>
          </div>
        ) : filteredInvites ? (
          <div className={styles.SprintInput}>
            <label className={styles.SprintLabel}>Client Invites</label>
            <div className={styles.InvitedClient}>
              <div className={styles.SprintInput}>
                <Typography variant="body2">Client Email</Typography>
              </div>
              <div className={styles.SprintInput}>
                <Typography variant="body2">Invitation Status</Typography>
              </div>
              <div className={styles.SprintInput}>
                <Typography sx={{ marginLeft: "auto" }} variant="body2">
                  Resend Email
                </Typography>
              </div>
            </div>
            {filteredInvites.length === 0 ? (
              <Typography marginTop={"10px"} variant="body2">
                {email
                  ? "No clients found for above email, send an invite now!"
                  : "No clients invited yet, enter an email above to get started!"}
              </Typography>
            ) : (
              <div className={styles.InvitedClients}>
                {filteredInvites.map((invite, index) => {
                  return (
                    <div
                      key={`${invite.invite_id}_${index}`}
                      className={styles.InvitedClient}
                    >
                      <div className={styles.SprintInput}>
                        <Typography variant="body2">
                          {invite.client_email}
                        </Typography>
                      </div>
                      <div className={styles.SprintInput}>
                        <Typography variant="body2">
                          {invite.status === "unaccepted" ? (
                            <div
                              style={{
                                backgroundColor: "rgba(255, 201, 20, 0.3)",
                              }}
                              className={styles.InputRow}
                            >
                              <Typography variant="body2" fontWeight={500}>
                                Unaccepted
                              </Typography>
                              <CloseIcon
                                sx={{
                                  backgroundColor: "rgba(255, 201, 20, 0.3)",
                                  color: "#FFC914",
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              style={{
                                backgroundColor: "rgba(255, 201, 20, 0.3)",
                              }}
                              className={styles.InputRow}
                            >
                              <Typography variant="body2" fontWeight={500}>
                                Accepted
                              </Typography>
                              <CheckIcon
                                sx={{
                                  backgroundColor: "rgba(46, 196, 182, 0.3)",
                                }}
                              />
                            </div>
                          )}
                        </Typography>
                      </div>
                      <div
                        className={styles.SprintInputIcon}
                        style={{ marginLeft: "auto" }}
                      >
                        <RefreshIcon
                          onClick={() => sendRefreshInvite(invite.client_email)}
                          className={styles.Icon}
                          sx={{
                            color: "#2EC4B6",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : null
      ) : null}
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}
