import { useEffect, useState } from "react";

import KanBanCard from "../KanBan/KanBanCard";

import fetchWrapper from "../../utils/fetchWrapper";
import AuthContext from "../../Contexts/AuthContext";
import { useContext } from "react";

import styles from "../../css/KanBanBoard.module.css";

export default function KanBanBoard() {
  const [tasks, setTasks] = useState([]);
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);

  useEffect(() => {
    fetchWrapper("/tasks", token, "GET", {
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setTasks(res.tasks);
      console.log(res.tasks)
    })
    setTasks()
  }, [])

  return (
    <div className={styles.Board}>
      <KanBanCard />
      <KanBanCard />
      <KanBanCard />
      <KanBanCard />
    </div>
  )
}