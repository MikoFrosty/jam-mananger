import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../css/Dashboard.module.css";
import SideBar from "./SideBar";
import Documentation from "./Documentation/documentation";
import DocumentCreator from "../DocumentComponents/DocumentCreator";
import {
  fetchClients,
  fetchDocuments,
  fetchFolders,
  fetchTeam,
  getOrganization,
  getUser,
  setLogout,
  setUser,
  toggleRefetch,
} from "../../StateManagement/Actions/actions";
import fetchWrapper from "../../utils/fetchWrapper";
import ClientView from "../Clients/ClientView";
import DocumentEditor from "../DocumentComponents/DocumentEditor";
import AllSprints from "./SprintManagement/AllSprints";
//import CreateSprint from "./SprintManagement/CreateSprint";
import Account from "../Account/Account";
import KanBan from "./SprintManagement/KanBan";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const organization = useSelector((state) => state.app.organization);
  const team = useSelector((state) => state.app.team);
  const logout = useSelector((state) => state.app.logout)
  const [sidebar, setSidebar] = useState(true);

  useEffect(() => {
    console.log(user);
    console.log(logout)
    if (!user && logout === false) {
      console.log("no user but trying refetch")
      dispatch(getUser())
    } else if (!user && logout === true) {
      navigate("/home")
    }
  }, [user, logout]);

  useEffect(() => {
    dispatch(fetchDocuments());
    dispatch(fetchFolders());

    if (!organization) {
      dispatch(getOrganization())
    }
    if (!team) {
    }
    dispatch(fetchTeam());
  }, []);

  const handleLogout = () => {
    dispatch(setUser(null))
    dispatch(setLogout(true))
  };

  function handleToggleSidebar() {
    setSidebar(!sidebar);
  }

  const viewMode = useSelector((state) => state.app.viewMode);

  const sidebarClass = sidebar ? styles.SideBar : styles.SideBarCollapsed;

  return (
    <div className={styles.Dashboard}>
      <div className={sidebarClass}>
        <SideBar
          onLogout={handleLogout}
          onToggleSidebar={handleToggleSidebar}
        />
      </div>
      <div className={styles.HoverTrigger}></div>
      {!sidebar ? (
        <div className={styles.HoverSideBar}>
          <SideBar
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
        {viewMode === "documentation" ? (
          <Documentation withoutFirstCards={false} />
        ) : viewMode === "documentation-browse" ? (
          <Documentation withoutFirstCards={true} />
        ) : viewMode === "documentation-create" ? (
          <DocumentCreator isOpen={true} />
        ) : viewMode === "documentation-edit" ? (
          <DocumentEditor isOpen={true}/>
        ) : viewMode === "clients" || viewMode === "clients-manage" ? (
          <ClientView />
        ) : viewMode === "sprint-management" ? (
          <KanBan />
        ) : viewMode === "account-details" ? (
          <Account />
        ) : null}
      </div>
    </div>
  );
}
