import React, { useState } from "react";
import styles from "../../css/SideBar.module.css"; // Assuming you have a CSS module
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HeaderDropdown from "../../components/HeaderDropdown";
import Plackard from "../../components/cards/Plackard";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

export default function SideBar({ onLogout, onToggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [directories, setDirectories] = useState([
    {
      id: 1,
      name: "Documentation",
      expanded: false,
      subdirectories: ["Browse Docs", "Create Doc"],
    },
    {
      id: 2,
      name: "Analytics",
      expanded: false,
      subdirectories: ["KPIs", "Team Overview"],
    },
    {
      id: 3,
      name: "Sprint Management",
      expanded: false,
      subdirectories: ["All Sprints", "Create Sprint", "Manage Sprints"],
    },
    {
      id: 4,
      name: "Reporting",
      expanded: false,
      subdirectories: ["Automations", "Create Report", "Ask AI"],
    },
    {
      id: 5,
      name: "Clients",
      expanded: false,
      subdirectories: ["Manage"],
    },
    {
      id: 6,
      name: "Integrations",
      expanded: false,
      subdirectories: ["Browse", "Manage"],
    },
  ]);

  function toggleSubdirectory(id) {
    setDirectories(
      directories.map((dir) =>
        dir.id === id ? { ...dir, expanded: !dir.expanded } : dir
      )
    );
  }

  const logDirectoryName = (name) => {
    console.log(name);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.SidebarTop}>
        <div className={styles.SideBarHeader}>
          <HeaderDropdown
            onToggleSidebar={onToggleSidebar}
            buttonContent={
              <Typography variant="body2">{user?.organization.name}</Typography>
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
              <li key={dir.id}>
                <div className={styles.directoryHeader}>
                  <span onClick={() => logDirectoryName(dir.name)}>
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
                    <li key={index}>{sub}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.SidebarFooter}>
        <KeyboardDoubleArrowLeftIcon className={styles.Icon} onClick={onToggleSidebar} />
      </div>
    </div>
  );
}
