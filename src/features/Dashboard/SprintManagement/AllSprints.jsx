import { useState, useEffect } from "react";

import styles from "../../../css/SprintManagement/AllSprints.module.css";
import DocumentationBar from "../Documentation/DocumentationBar";
import SearchBar from "../../../components/searchbar/SearchBar";
import FixedButton from "../../Buttons/FloatingAction";
import { useDispatch } from "react-redux";
import {
  createSprint,
  fetchSprints,
  getOrganization,
  setEditingSprint,
  toggleView,
} from "../../../StateManagement/Actions/actions";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { DoughnutChart } from "../../../components/charts/doughnut";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SprintTable from "./SprintsTable";
import KanBan from "./KanBan";

export default function AllSprints() {
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.app.organization);
  const sprints = useSelector((state) => state.app.sprints);
  const activeSprint = sprints.filter(
    (sprint) => sprint.status === "Active"
  )[0];
  const totalMinutes =
    activeSprint?.tasks.reduce((acc, task) => acc + task.duration, 0) || 0;
  // console.log(sprints);
  // console.log(activeSprint);
  const [view, setView] = useState("Table");

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(searchTerm) {
    console.log(`Search for: ${searchTerm}`);
    // Add your search logic here (e.g., filtering data, making an API call)
    setSearchTerm(searchTerm);
  }

  const statusColors = {
    Active: {
      sx: {
        color: "#2EC4B6",
        backgroundColor: "rgba(46, 196, 182, 0.3)",
        padding: "5px",
        borderRadius: "5px",
      },
    },
    "Not Started": {
      sx: {
        color: "#FFC914",
        backgroundColor: "rgba(255, 201, 20, 0.3)",
        padding: "5px",
        borderRadius: "5px",
      },
    },
    Completed: {
      sx: {
        color: "#FF9F1C",
        backgroundColor: "rgba(255, 159, 28, 0.3)",
        padding: "5px",
        borderRadius: "5px",
      },
    },
  };

  useEffect(() => {
    if (!organization) {
      dispatch(getOrganization());
    }
    dispatch(fetchSprints());
  }, []);

  function handleSearch(searchTerm) {
    console.log(`Search for: ${searchTerm}`);
    // Add your search logic here (e.g., filtering data, making an API call)
    setSearchTerm(searchTerm);
  }

  function handleViewToggle(value) {
    setView(value);
  }

  function handleSprintSelect(sprint) {
    dispatch(setEditingSprint(sprint));
    dispatch(toggleView("sprint-create"));
  }

  function handleCreateClick() {
    const payload = {
      title: "New Sprint",
      members: [...organization.members, ...organization.admins],
      viewers: {},
      start_date_time: new Date(Date.now() + 3600 * 1000 * 24),
      duration: 3600 * 1000 * 168,
      kpi_data: {},
      tasks: [],
      objective: "Define and kick off the new feature development sprint",
      description: "Describe your sprint"
    };

    console.log(payload);

    dispatch(createSprint(payload));

    dispatch(toggleView("sprint-create"));
  }

  return (
    <div className={styles.SprintView}>
      <DocumentationBar
        label={"All Sprints"}
        toggle={true}
        toggleOptions={["Gantt", "Table", "Calendar"]}
        view={view}
        onViewToggle={handleViewToggle}
        searchChild={<SearchBar onSearch={handleSearch} />}
      />
      <div className={styles.SprintViewContent}>
        {activeSprint ? (
          <div onClick={() => handleSprintSelect(activeSprint)} className={styles.ActiveSprint}>
            <div className={styles.SprintInput}>
              <div className={styles.LabelWithStatus}>
                <label className={styles.SprintLabel} htmlFor="BacklogColumn">
                  Active Sprint
                </label>
                <FiberManualRecordIcon sx={statusColors["Active"].sx} />
              </div>
              <Typography variant="h5">{activeSprint?.title}</Typography>
            </div>
            <div className={styles.SprintDataRow}>
              {/* <div className={styles.SprintData}>
                <label style={{justifySelf: "start"}} className={styles.SprintLabel} htmlFor="BacklogColumn">
                  Hours Worked
                </label>
                <Typography variant="h3">{totalMinutes}</Typography>
              </div> */}
              <div className={styles.SprintData}>
                <DoughnutChart
                  datasets={[
                    {
                      data: [
                        activeSprint.tasks.filter(
                          (task) => task.status.status_title === "Backlog"
                        ).length,
                        activeSprint.tasks.filter(
                          (task) => task.status.status_title === "To Do"
                        ).length,
                        activeSprint.tasks.filter(
                          (task) => task.status.status_title === "In Progress"
                        ).length,
                        activeSprint.tasks.filter(
                          (task) => task.status.status_title === "Done"
                        ).length,
                      ],
                      backgroundColor: [
                        "rgba(245, 81, 31, 0.3)",
                        "rgba(255, 159, 28, 0.3)",
                        "rgba(255, 201, 20, 0.3)",
                        "rgba(46, 196, 182, 0.3)",
                      ],
                      borderColor: ["#F5511F", "#FF9F1C", "#FFC914", "#2EC4B6"],
                      borderWidth: 1,
                    },
                  ]}
                  labels={["Backlog", "To Do", "In Progress", "Done"]}
                />
              </div>
            </div>
            {activeSprint.description ? (
              <div className={styles.SprintInput}>
                <label className={styles.SprintLabel} htmlFor="BacklogColumn">
                  Description
                </label>
                <Typography variant="body1">
                  {activeSprint.description || <Skeleton />}
                </Typography>
              </div>
            ) : null}
            {activeSprint.objective ? (
              <div className={styles.SprintInput}>
                <label className={styles.SprintLabel} htmlFor="BacklogColumn">
                  Objective
                </label>
                <Typography variant="body1">
                  {activeSprint.objective || <Skeleton />}
                </Typography>
              </div>
            ) : null}
          </div>
        ) : null}
        <div className={styles.InactiveSprints}>
          <SprintTable handleSprintSelect={handleSprintSelect} searchTerm={searchTerm}/>
        </div>
      </div>
      <FixedButton label={"Create Sprint"} handleClick={handleCreateClick} />
    </div>
  );
}
