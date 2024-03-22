import { useState, useEffect, useCallback } from "react";
import styles from "../../../css/Client/ProjectCreate.module.css";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  fetchPartners,
  getOrganization,
} from "../../../StateManagement/Actions/actions";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import HoverDropdown from "../../../components/HoverDropdown";

import Typography from "@mui/material/Typography";
import fetchWrapper from "../../../utils/fetchWrapper";

export default function ProjectCreate({ toggleModal, selectedProject }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [updateProject, setUpdateProject] = useState(false);
  const [hourlyCost, setHourlyCost] = useState(null);
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [projectCost, setProjectCost] = useState(0);
  const [status, setStatus] = useState(null);

  const projectStatuses = [
    {
      title: "In Progress",
      color: "#2EC4B6",
      softerColor: "rgba(46, 196, 182, 0.3)", // Softer color with reduced opacity
    },
    {
      title: "Archived",
      color: "#FFC914",
      softerColor: "rgba(255, 201, 20, 0.3)",
    },
    {
      title: "Complete",
      color: "#FF9F1C",
      softerColor: "rgba(255, 159, 28, 0.3)",
    },
    {
      title: "Over Budget",
      color: "#F5511F",
      softerColor: "rgba(245, 81, 31, 0.3)",
    },
  ];

  useEffect(() => {
    if (selectedProject && hourlyCost) {
      const project_cost = hourlyCost.rate
        ? selectedProject.budget / hourlyCost.rate
        : selectedProject.budget / hourlyCost.low;
      setTitle(selectedProject.title);
      setProjectDescription(selectedProject.description);
      setUpdateProject(true);
      setProjectCost(selectedProject.budget);
      setStatus(selectedProject.status);
      setEstimatedHours(project_cost);
    }
  }, [selectedProject, hourlyCost]);

  const clientPartner = useSelector((state) => state.app.client_partner);

  useEffect(() => {
    if (!clientPartner) {
      dispatch(fetchPartners());
    } else {
      const rates = clientPartner.members.map((member) => member.hourly_rate);
      const minRate = Math.min(...rates);
      const maxRate = Math.max(...rates);

      if (rates.length === 1) {
        setHourlyCost({ rate: minRate });
      } else {
        setHourlyCost({ low: minRate, high: maxRate });
      }
    }
  }, [clientPartner]);

  useEffect(() => {
    if (hourlyCost) {
      if (hourlyCost.rate) {
        setProjectCost({
          rate: estimatedHours ? hourlyCost.rate * estimatedHours : 0,
        });
      } else if (hourlyCost.low && hourlyCost.high) {
        setProjectCost({
          low: estimatedHours ? hourlyCost.low * estimatedHours : 0,
          high: estimatedHours ? hourlyCost.high * estimatedHours : 0,
        });
      }
    }
  }, [estimatedHours, hourlyCost]);

  function handleProjectCreate() {
    if (
      projectCost &&
      estimatedHours &&
      hourlyCost &&
      title &&
      projectDescription
    ) {
      const payload = {
        title,
        description: projectDescription,
        budget: projectCost.rate ? projectCost.rate : projectCost.high,
      };

      fetchWrapper("/project", localStorage.getItem("token"), "POST", {
        ...payload,
      }).then((res) => {
        if (res.message === "Project saved") {
          toggleModal();
        }
      });
    }
  }

  function handleProjectUpdate() {
    if (
      projectCost &&
      estimatedHours &&
      hourlyCost &&
      title &&
      projectDescription &&
      selectedProject &&
      status
    ) {
      const payload = {
        project_id: selectedProject.project_id,
        title,
        description: projectDescription,
        budget: projectCost.rate ? projectCost.rate : projectCost.high,
        status: status,
      };

      fetchWrapper("/update-project", localStorage.getItem("token"), "PUT", {
        ...payload,
      }).then((res) => {
        if (res.message === "Project Updated") {
          toggleModal();
        }
      });
    }
  }

  function handleProjectTitleChange(val) {
    setTitle(val);
  }

  function handleProjectDescriptionChange(val) {
    setProjectDescription(val);
  }

  return (
    <div className={styles.ProjectCreation}>
      <div
        className={styles.Box}
        component="form"
        onSubmit={handleProjectCreate}
        noValidate
        sx={{ mt: 1 }}
      >
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="SprintTitleInput">
            Project Title
          </label>
          <input
            id="SprintTitleInput"
            className={styles.SprintTitleInput}
            value={title}
            placeholder={"Add call to actions"}
            onChange={(e) => handleProjectTitleChange(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.SprintInput}>
          <label
            className={styles.SprintLabel}
            htmlFor="ProjectDescriptionInput"
          >
            Description
          </label>
          <textarea
            id="ProjectDescriptionInput"
            className={styles.SprintTitleInput}
            value={projectDescription}
            placeholder={
              "Within the Kamari landing page, add 3 call to actions"
            }
            onChange={(e) => handleProjectDescriptionChange(e.target.value)}
            style={{ minHeight: "200px" }}
          />
        </div>
        <div className={styles.InputRow}>
          <div className={styles.SprintInputRow}>
            <label className={styles.SprintLabel}>Hourly Cost</label>
            {!hourlyCost ? (
              <div
                style={{
                  width: "100%",
                  height: "35px",
                  marginBottom: "5px",
                  marginTop: "-3px",
                }}
              >
                <Skeleton width={"100%"} height={"100%"} />
              </div>
            ) : hourlyCost.rate ? (
              <div className={styles.InputGroupRow}>
                <Typography variant="body1">$</Typography>
                <input
                  className={styles.SprintTitleInput}
                  style={{
                    backgroundColor: "transparent",
                    padding: "10px",
                    borderRadius: "5px",
                    textAlign: "left",
                  }}
                  value={hourlyCost.rate}
                  readOnly
                />
              </div>
            ) : hourlyCost.low && hourlyCost.high ? (
              <input
                className={styles.SprintTitleInput}
                style={{
                  backgroundColor: "transparent",
                  padding: "10px",
                  borderRadius: "5px",
                  textAlign: "left",
                }}
                value={`${hourlyCost.low} - ${hourlyCost.high}`}
                readOnly
              />
            ) : null}
          </div>
          <Typography
            sx={{ alignSelf: "end", marginBottom: "5px" }}
            fontSize={"large"}
            variant="body1"
          >
            X
          </Typography>
          <div className={styles.SprintInputRow}>
            <label className={styles.SprintLabel}>Estimated Hours</label>
            <input
              value={estimatedHours || ""}
              onChange={(e) => setEstimatedHours(e.target.value)}
              min={0}
              className={styles.SprintTitleInput}
              type="number"
            />
          </div>
          <Typography
            sx={{ alignSelf: "end", marginBottom: "5px" }}
            fontSize={"large"}
            variant="body1"
          >
            =
          </Typography>
          <div className={styles.SprintInputRow}>
            <label className={styles.SprintLabel}>Budget</label>
            {projectCost.rate || projectCost.rate === 0 ? (
              <div className={styles.InputGroupRow}>
                <Typography variant="body1">$</Typography>
                <input
                  className={styles.SprintTitleInput}
                  style={{
                    backgroundColor: "transparent",
                    padding: "10px",
                    borderRadius: "5px",
                    textAlign: "left",
                  }}
                  value={projectCost.rate}
                  onChange={(e) => {
                    if (hourlyCost.rate) {
                      setEstimatedHours(e.target.value / hourlyCost.rate);
                    }
                  }}
                />
              </div>
            ) : projectCost.low && projectCost.high ? (
              <div className={styles.InputGroupRow}>
                <Typography variant="body1">$</Typography>
                <input
                  className={styles.SprintTitleInput}
                  style={{
                    backgroundColor: "transparent",
                    padding: "10px",
                    borderRadius: "5px",
                    textAlign: "left",
                  }}
                  value={`${projectCost.low} - ${projectCost.high}`}
                  onChange={(e) => {
                    const [low, high] = e.target.value.split("-").map(Number);
                    if (hourlyCost.low && hourlyCost.high) {
                      setEstimatedHours((low / hourlyCost.low).toFixed(2));
                    }
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
          {status ? (
            <div className={styles.SprintInput}>
              <label className={styles.SprintLabel} htmlFor="ProjectStatusSelect">Project Status</label>
              <HoverDropdown
                id={"ProjectStatusSelect"}
                customStyles={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                }}
                buttonContent={
                  <Typography variant="body1">
                    {
                      status.title
                    }
                  </Typography>
                }
                dropdownContent={
                  <>
                    {projectStatuses.map((option, index) => {
                      return (
                        <div
                          key={`status_${index}`}
                          onClick={() => setStatus(option)}
                          className={`${styles.HoverDropdownContentChildren} ${
                            option.title === status?.title
                              ? styles.Selected
                              : ""
                          }`}
                        >
                          <Typography variant="body1">
                            {option.title}
                          </Typography>
                        </div>
                      );
                    })}
                  </>
                }
              />
            </div>
          ) : null}
        {!updateProject ? (
          <button className={styles.CreateButton} onClick={handleProjectCreate}>
            Create Project
          </button>
        ) : (
          <button onClick={handleProjectUpdate} className={styles.CreateButton}>
            Update Project
          </button>
        )}
      </div>
    </div>
  );
}
