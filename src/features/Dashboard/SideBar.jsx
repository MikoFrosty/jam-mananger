import React, { useState } from "react";
import styles from "../../css/SideBar.module.css"; // Assuming you have a CSS module
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HeaderDropdown from "../../components/HeaderDropdown";
import Plackard from "../../components/cards/Plackard";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { toggleView } from "../../StateManagement/Actions/actions";

export default function SideBar({
  onLogout,
  onToggleSidebar,
  customStyles,
  switchToggleIcon,
}) {
  const user = localStorage.getItem("user") === "undefined" ? {} : JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.app.viewMode);

  const [directories, setDirectories] = useState([
    {
      id: 1,
      name: "Documentation",
      expanded: false,
      subdirectories: [
        { name: "Browse Docs", view: "documentation-browse" },
        { name: "Create Docs", view: "documentation-create" },
      ],
    },
    {
      id: 2,
      name: "Analytics",
      expanded: false,
      subdirectories: [
        { name: "KPIs", view: "analytics-kpis" },
        { name: "Team Overview", view: "analytics-team-overview" },
      ],
    },
    {
      id: 3,
      name: "Sprint Management",
      expanded: false,
      subdirectories: [
        { name: "All Sprints", view: "sprint-all" },
        { name: "Create Sprint", view: "sprint-create" },
        { name: "Manage Sprints", view: "sprint-manage" },
      ],
    },
    {
      id: 4,
      name: "Reporting",
      expanded: false,
      subdirectories: [
        { name: "Automations", view: "reporting-automations" },
        { name: "Create Report", view: "reporting-create" },
        { name: "Ask AI", view: "reporting-ask-ai" },
      ],
    },
    {
      id: 5,
      name: "Clients",
      expanded: false,
      subdirectories: [{ name: "Manage", view: "clients-manage" }],
    },
    {
      id: 6,
      name: "Integrations",
      expanded: false,
      subdirectories: [
        { name: "Browse", view: "integrations-browse" },
        { name: "Manage", view: "integrations-manage" },
      ],
    },
  ]);

  function toggleSubdirectory(id) {
    setDirectories(
      directories.map((dir) =>
        dir.id === id ? { ...dir, expanded: !dir.expanded } : dir
      )
    );
  }

  function handleNavigation(view) {
    dispatch(toggleView(view.toLowerCase()));
    localStorage.setItem("lastView", view.toLowerCase());
  }

  // Define a function to check if the view matches and apply styles for directories
  const getDirectoryStyle = (dirName) => {
    return viewMode === dirName.toLowerCase()
      ? { backgroundColor: '#f1f1f1', borderRadius: '5px' }
      : {};
  };

  // Similar function for subdirectories
  const getSubdirectoryStyle = (subView) => {
    return viewMode === subView.toLowerCase()
      ? { backgroundColor: '#f1f1f1', borderRadius: '5px' }
      : {};
  };

  return (
    <div style={customStyles ? customStyles : {}} className={styles.sidebar}>
      <div className={styles.SidebarTop}>
        <div className={styles.SideBarHeader}>
          <HeaderDropdown
            onToggleSidebar={onToggleSidebar}
            buttonContent={
              <Typography variant="body2">{user?.organization?.name}</Typography>
            }
            dropdownContent={
              <div>
                <Plackard onLogout={onLogout} />
                <button className={styles.HeaderDropdownButton}>
                  Invite Clients
                </button>
                <button className={styles.HeaderDropdownButton}>
                  Account Details
                </button>
              </div>
            }
          />
        </div>
        <div className={styles.SidebarContent}>
          <ul>
            {directories.map((dir) => (
              <li key={dir.id} style={getDirectoryStyle(dir.name)}>
                <div className={styles.directoryHeader}>
                  <span onClick={() => handleNavigation(dir.name)}>
                    {dir.name}
                  </span>
                  <button onClick={() => toggleSubdirectory(dir.id)}>
                    {dir.expanded ? (
                      <KeyboardArrowDownIcon className={styles.Icon} />
                    ) : (
                      <KeyboardArrowUpIcon className={styles.Icon} />
                    )}
                  </button>
                </div>
                <ul
                  className={`${styles.subdirectoryList} ${
                    dir.expanded ? styles.expanded : ""
                  }`}
                >
                  {dir.subdirectories.map((sub, index) => (
                    <li key={index} style={getSubdirectoryStyle(sub.view)}>
                      <Typography onClick={() => handleNavigation(sub.view)} variant="body2">{sub.name}</Typography>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.SidebarFooter}>
        {switchToggleIcon ? (
          <KeyboardDoubleArrowRightIcon
            className={styles.Icon}
            onClick={onToggleSidebar}
          />
        ) : (
          <KeyboardDoubleArrowLeftIcon
            className={styles.Icon}
            onClick={onToggleSidebar}
          />
        )}
      </div>
    </div>
  );
};