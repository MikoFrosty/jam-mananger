import TextField from "@mui/material/TextField";
import styles from "../../css/Client/ClientView.module.css";
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import fetchWrapper from "../../utils/fetchWrapper";

export default function ClientView() {
  const [email, setEmail]  = useState("");
  const clients = JSON.parse(localStorage.getItem("clients"));
  console.log(email)

  // useEffect(() => {
  //   if (clients === null) {
  //     fetchWrapper("/clients", localStorage.getItem("token"), "GET").then((res) => {
  //       localStorage.setItem("clients", res)
  //     });
  //   }
  // }, [])

  function sendClientInvite() {
    const payload = {
      "client_email": email
    };
    fetchWrapper("/client-invitation", localStorage.getItem("token"), "POST", {...payload}).then((res) => {
      if (res.message === 'Client Invite Sent') {
        console.log("Sent Email to: ", email)
      }
    })
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  return (
    <div className={styles.ClientView}>
      <div className={styles.ClientInvite}>
        <Typography variant="body1">Invite Clients</Typography>
        <div className={styles.ClientEmailRow}>
          <TextField onChange={(e) => handleEmailChange(e)} className={styles.ClientEmailInput} placeholder="Client Email"/>
          <SendIcon onClick={sendClientInvite} className={styles.Icon}/>
        </div>
      </div>
      <div className={styles.ClientMain}>

      </div>
    </div>
  )
}