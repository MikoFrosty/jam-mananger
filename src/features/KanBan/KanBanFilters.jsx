import { useState, useEffect } from "react";
import styles from "../../css/KanBanFilters.module.css";
import fetchWrapper from "../../utils/fetchWrapper";
import AuthContext from "../../Contexts/AuthContext";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import ItemSearch from "../../components/ItemSearch";

// import mui
import Typography from '@mui/material/Typography';

// import icons
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function KanBanFilters({ modalToggle, viewChange, displayChange }) {
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [filteredJams, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchWrapper("/projects", token, "GET", {
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setProjects([{ _id: "all", title: "All Projects" }, ...res.projects]);
    });
  }, []);

  function handleLogout() {
    console.log("Logging out"); // Debugging log
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/home");
  }

  const handleSelect = (itemId) => {
    console.log("handleItemSelect", itemId);
    const selectedItem = projects.filter((item) => item._id === itemId);
    setFilteredItems([selectedItem]);
  };

  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  return (
    <div className={styles.FilterBar}>
      <div className={styles.FilterBarGroup}>
        <ItemSearch
          label={"Projects"}
          focused={true}
          itemList={projects}
          onItemSelect={handleSelect}
          onSearchChange={handleSearchChange}
        />
        <AddIcon className={styles.Icon} />
      </div>
      <div className={styles.FilterBarGroup}>
        <div className={styles.IconWithText}>
          <Typography variant="body1">Create Report</Typography>
          <AutoAwesomeIcon style={{color: "purple"}} className={styles.Icon}/>
        </div>
        <div onClick={modalToggle} className={styles.IconWithText}>
          <Typography variant="body1">Create Task</Typography>
          <AddIcon style={{color: "purple"}} className={styles.Icon}/>
        </div>
        <LogoutIcon className={styles.Icon} onClick={handleLogout} />
      </div>
    </div>
  );
}
