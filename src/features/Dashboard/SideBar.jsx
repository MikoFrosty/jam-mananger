import React, { useEffect, useState } from "react";
import styles from "../../css/SideBar.module.css"; // Assuming you have a CSS module
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HeaderDropdown from "../../components/HeaderDropdown";
import Plackard from "../../components/cards/Plackard";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toggleView } from "../../StateManagement/Actions/actions";

export default function SideBar({
  type = "user",
  onLogout,
  onToggleSidebar,
  customStyles,
  switchToggleIcon,
}) {
  const user =
    localStorage.getItem("user") === "undefined"
      ? {}
      : JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.app.viewMode);
  const clientUser = useSelector((state) => state.app.client_user);
  const [client, setClient] = useState(null);

  const [directories, setDirectories] = useState([
    {
      id: 3,
      name: "Tasks",
      view: "tasks",
      expanded: false,
      subdirectories: [],
    },
    {
      id: 5,
      name: "Clients",
      view: "clients",
      expanded: false,
      subdirectories: [],
    },
    {
      id: 7,
      name: "Invoices",
      view: "invoices",
      expanded: false,
      subdirectories: [],
    },
  ]);

  const [clientDirectories, setClientDirectories] = useState([
    {
      id: 1,
      name: "Task Board",
      view: "client-tasks",
      expanded: false,
      subdirectories: [],
    },
    {
      id: 2,
      name: "Invoices",
      view: "client-invoices",
      expanded: false,
      subdirectories: [],
    },
    {
      id: 3,
      name: "Projects",
      view: "client-projects",
      expanded: false,
      subdirectories: [],
    },
    {
      id: 4,
      name: "Contracts",
      view: "client-contracts",
      expanded: false,
      subdirectories: [],
    },
  ]);

  useEffect(() => {
    console.log(clientUser);
  }, [clientUser]);

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
      ? { backgroundColor: "#f1f1f1", borderRadius: "5px" }
      : {};
  };

  // Similar function for subdirectories
  const getSubdirectoryStyle = (subView) => {
    return viewMode === subView.toLowerCase()
      ? { backgroundColor: "#f1f1f1", borderRadius: "5px" }
      : {};
  };

  useEffect(() => {
    console.log(viewMode);
    console.log(type)
  }, [viewMode]);

  return (
    <div style={customStyles ? customStyles : {}} className={styles.sidebar}>
      <div className={styles.SidebarTop}>
        <div className={styles.SideBarHeader}>
          <HeaderDropdown
            onToggleSidebar={onToggleSidebar}
            buttonContent={
              <Typography variant="body2">
                {type === "user" ? (
                  user?.organization?.name
                ) : type === "client" && clientUser ? (
                  clientUser.account_name
                ) : (
                  <Skeleton height="100%" width="100%" />
                )}
              </Typography>
            }
            dropdownContent={
              <div>
                <Plackard type={type} onLogout={onLogout} />
                {type === "user" ? (
                  <>
                    <button
                      onClick={() => handleNavigation("clients")}
                      className={styles.HeaderDropdownButton}
                    >
                      View Clients
                    </button>
                    <button
                      onClick={() => handleNavigation("account-details")}
                      className={styles.HeaderDropdownButton}
                    >
                      Account Details
                    </button>
                  </>
                ) : // <>
                //   <button
                //     onClick={() => handleNavigation("partner-view")}
                //     className={styles.HeaderDropdownButton}
                //   >
                //     View Partners
                //   </button>
                //   <button
                //     onClick={() => handleNavigation("client-account")}
                //     className={styles.HeaderDropdownButton}
                //   >
                //     Account Details
                //   </button>
                // </>
                null}
              </div>
            }
          />
        </div>
        <div className={styles.SidebarContent}>
          <ul>
            {type === "user" ? (
              directories.map((dir) => (
                <li key={dir.id} style={getDirectoryStyle(dir.name)}>
                  <div className={styles.directoryHeader}>
                    <span onClick={() => handleNavigation(dir.view)}>
                      {dir.name}
                    </span>
                    {dir.subdirectories.length !== 0 ? (
                      <button onClick={() => toggleSubdirectory(dir.id)}>
                        {dir.expanded ? (
                          <KeyboardArrowDownIcon className={styles.Icon} />
                        ) : (
                          <KeyboardArrowUpIcon className={styles.Icon} />
                        )}
                      </button>
                    ) : null}
                  </div>
                  <ul
                    className={`${styles.subdirectoryList} ${
                      dir.expanded ? styles.expanded : ""
                    }`}
                  >
                    {dir.subdirectories?.map((sub, index) => (
                      <li key={index} style={getSubdirectoryStyle(sub.view)}>
                        <Typography
                          onClick={() => handleNavigation(sub.view)}
                          variant="body2"
                        >
                          {sub.name}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : clientDirectories ? (
              clientDirectories.map((dir) => (
                <li key={dir.id} style={getDirectoryStyle(dir.name)}>
                  <div className={styles.directoryHeader}>
                    <span onClick={() => handleNavigation(dir.view)}>
                      {dir.name}
                    </span>
                    {dir.subdirectories.length !== 0 ? (
                      <button onClick={() => toggleSubdirectory(dir.id)}>
                        {dir.expanded ? (
                          <KeyboardArrowDownIcon className={styles.Icon} />
                        ) : (
                          <KeyboardArrowUpIcon className={styles.Icon} />
                        )}
                      </button>
                    ) : null}
                  </div>
                  <ul
                    className={`${styles.subdirectoryList} ${
                      dir.expanded ? styles.expanded : ""
                    }`}
                  >
                    {dir.subdirectories?.map((sub, index) => (
                      <li key={index} style={getSubdirectoryStyle(sub.view)}>
                        <Typography
                          onClick={() => handleNavigation(sub.view)}
                          variant="body2"
                        >
                          {sub.name}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <Skeleton height="100%" width="100%" />
            )}
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
}
