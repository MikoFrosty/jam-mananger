import { useState, useEffect } from "react";
import styles from "../../css/Client/ClientDashboard.module.css"
import SideBar from "../Dashboard/SideBar"
import { fetchClientDocuments, fetchClientUser, fetchPartners, setClientUser, setLogout, toggleView } from "../../StateManagement/Actions/actions";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Documentation from "../Dashboard/Documentation/documentation";
import KanBan from "../Dashboard/SprintManagement/KanBan";
import Account from "../Account/Account";
import ClientView from "./ClientView";
import { useDispatch } from "react-redux";
import DocumentEditor from "../DocumentComponents/DocumentEditor";

export default function ClientDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);
  const sidebarClass = sidebar ? styles.SideBar : styles.SideBarCollapsed;
  const clientUser = useSelector((state) => state.app.client_user);
  const logout = useSelector((state) => state.app.logout);
  const viewMode = useSelector((state) => state.app.viewMode);
  const clientPartners = useSelector((state) => state.app.client_partner);
  const documents = useSelector((state) => state.app.documents);

  useEffect(() => {
    if (!clientUser && logout) {
      localStorage.clear();
      navigate("/home");
    }
    else if (!clientUser) {
      dispatch(fetchClientUser());
    }
  }, [logout, clientUser])

  useEffect(() => {
    if (!localStorage.getItem("token") && !clientUser) {
      navigate("/home");
    }
  }, [])

  useEffect(() => {
    if (!viewMode) {
      dispatch(toggleView("client-tasks"));
      localStorage.setItem("lastView", "client-tasks")
    }
  }, [])

  useEffect(() => {
    if (!clientPartners) {
      dispatch(fetchPartners());
    }
    if (!documents) {
      dispatch(fetchClientDocuments())
    }
  }, [clientPartners, documents])

  function handleToggleSidebar() {
    setSidebar(!sidebar);
  }

  const handleLogout = () => {
    dispatch(setClientUser(null))
    dispatch(setLogout(true))
  };

  return (
    <div className={styles.ClientDashboard}>
      <div className={sidebarClass}>
        <SideBar
          type={"client"}
          onLogout={handleLogout}
          onToggleSidebar={handleToggleSidebar}
        />
      </div>
      <div className={styles.HoverTrigger}></div>
      {!sidebar ? (
        <div className={styles.HoverSideBar}>
          <SideBar
            type={"client"}
            onLogout={handleLogout}
            onToggleSidebar={handleToggleSidebar}
            customStyles={{
              height: "fit-content",
              border: "none",
              borderRadius: "5px",
              boxShadow: "0px 0px 10px #e5e5e5",
              backgroundColor: "white",
            }}
            switchToggleIcon={true}
          />
        </div>
      ) : null}
      <div className={styles.Main}>
        {
          viewMode === "client-docs" ? (
            <Documentation type={"client"} />
          ) : viewMode === "client-tasks" ? (
            <KanBan type={"client"} />
          ) : viewMode === "client-account" ? (
            <Account type={"client"} />
          ) : viewMode === "partner-view" ? (
            <ClientView type={"client"}/>
          ) : viewMode === "documentation-edit" ? (
            <DocumentEditor isOpen={true} readOnly={true} noBar={true}/>
          ) : null
        }
      </div>
    </div>
  )
}