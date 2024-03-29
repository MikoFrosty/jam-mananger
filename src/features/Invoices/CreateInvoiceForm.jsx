import { useState, useEffect, useCallback } from "react";
import styles from "../../css/SprintManagement/CreateTaskForm.module.css";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import HoverDropdown from "../../components/HoverDropdown";

import Typography from "@mui/material/Typography";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import TaskDescriptionCreator from "../DocumentComponents/TaskDescription";
import {
  addMemberTask,
  deleteTasks,
  fetchClientUser,
  fetchProjects,
  fetchClients,
  fetchPartners,
  fetchTasks,
  getOrganization,
  setSelectedMemberTasks,
} from "../../StateManagement/Actions/actions";

import Tooltip from "@mui/material/Tooltip";

import _ from "lodash";
import TaskTable from "../Dashboard/SprintManagement/TaskTable";
import fetchWrapper from "../../utils/fetchWrapper";

export default function InvoiceCreate({ toggleModal, isOpen, type = "user" }) {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.app.clients);
  const projects = useSelector((state) => state.app.projects);
  const [filteredProjects, setFilteredProjects] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [filteredClients, setFilteredClients] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [refetchProjects, setRefetchProjects] = useState(false);
  const currentOrg = useSelector((state) => state.app.organization);
  const [selectedClient, setSelectedClient] = useState(null);
  const tasks = useSelector((state) => state.app.memberTasks);
  const [totalHours, setTotalHours] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [invoiceTitle, setInvoiceTitle] = useState("");
  const [tooltipMessage, setTooltipMessage] = useState("");

  useEffect(() => {
    if (!projects || refetchProjects) {
      dispatch(fetchProjects());
      setRefetchProjects(false);
    }
  }, [projects, refetchProjects]);

  useEffect(() => {
    if (clients) {
      console.log("Clients", clients);
    } else {
      dispatch(fetchClients());
    }
  }, [clients]);

  useEffect(() => {
    if (selectedProject && clients) {
      const theseClients =
        type === "user"
          ? clients.filter(
              (client) => selectedProject.client.client_id === client.client_id
            )
          : projects;

      setFilteredClients(theseClients);
    }
  }, [selectedProject]);

  useEffect(() => {
    console.log(selectedClient);
    if (selectedClient && projects) {
      const theseProjects = projects.filter(
        (project) => project.client.client_id === selectedClient.client_id
      );

      setFilteredProjects(theseProjects);
    } else if (!selectedClient && projects) {
      setFilteredProjects(projects);
    }
  }, [selectedClient, projects]);

  useEffect(() => {
    if (type) {
      if (type === "user") {
        dispatch(getOrganization());
        if (!clients) {
          dispatch(fetchClients());
        }
      } else if (type === "client") {
        dispatch(fetchPartners());
      }
    }
  }, [type]);

  useEffect(() => {
    if (
      selectedTasks?.length > 0 &&
      selectedTasks?.length < 16 &&
      selectedClient &&
      invoiceTitle !== "" && totalHours > 1.00
    ) {
      setIsDisabled(false);
    } else if (
      selectedTasks?.length === 0 ||
      !selectedTasks ||
      !selectedClient ||
      invoiceTitle === "" || totalHours < 1.00
    ) {
      setIsDisabled(true);
    }

    if (selectedClient) {
      dispatch(fetchTasks());
    }
  }, [selectedClient, selectedTasks, invoiceTitle, totalHours]);

  useEffect(() => {
    if (isDisabled) {
      if (!selectedTasks || selectedTasks?.length === 0) {
        setTooltipMessage("Select a task")
      } else if (!selectedClient) {
        setTooltipMessage("Select a client")
      } else if (invoiceTitle === "") {
        setTooltipMessage("Enter an invoice title")
      } else if (totalHours < 1.00) {
        setTooltipMessage("You must have at least one hour tracked across your selected tasks to create an invoice")
      }
    }

    if (selectedClient) {
      dispatch(fetchTasks());
    }
  }, [selectedClient, selectedTasks, invoiceTitle, totalHours]);

  useEffect(() => {
    if (selectedTasks?.length > 0) {
      let these_hours = 0;
      selectedTasks.forEach((task) => {
        let billed_duration = task.billed_duration || 0.00;
        if (task.duration) {
          these_hours = (these_hours + (task.duration - billed_duration)).toFixed(3);
        }
      })

      these_hours = these_hours / (60 * 60 * 1000)

      setTotalHours(parseFloat(these_hours));
    } else {
      setTotalHours(0.00);
    }
  }, [selectedTasks])

  function handleClientSelect(client) {
    if (selectedClient?.client_name === client.client_name) {
      setSelectedClient(null);
    } else {
      setSelectedClient(client);
    }
  }

  function handleProjectSelect(value) {
    if (value.project_id === selectedProject?.project_id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(value);
    }
  }

  function createInvoice() {
    const payload = {
      title: invoiceTitle,
      client_id: selectedClient.client_id,
      task_ids: selectedTasks.map((task) => task.task_id),
    };

    fetchWrapper("/invoices", localStorage.getItem("token"), "POST", {
      ...payload,
    }).then((res) => {
      if (res.message === "Invoice Created") {
        toggleModal();
        console.log(res);
      }
    });
  }

  function handleTaskSelect(task) {
    if (
      selectedTasks?.some(
        (selected_task) => selected_task.task_id === task.task_id
      )
    ) {
      // remove task from selected tasks and update local state
      const updatedSelectedTasks = selectedTasks.filter(
        (selected_task) => selected_task.task_id !== task.task_id
      );
      setSelectedTasks(updatedSelectedTasks);
    } else if (selectedTasks) {
      setSelectedTasks([...selectedTasks, task]);
    } else {
      setSelectedTasks([task]);
    }
  }

  return (
    <div className={styles.Box} component="form" noValidate sx={{ mt: 1 }}>
      <div className={styles.SprintInput}>
        <label className={styles.SprintLabel} htmlFor="TaskAssignees">
          Invoice Title
        </label>
        <input
          placeholder="UI Revamp"
          value={invoiceTitle}
          onChange={(e) => setInvoiceTitle(e.target.value)}
          className={styles.SprintTitleInput}
          type="text"
        />
      </div>
      <div className={styles.SprintInput}>
        <label className={styles.SprintLabel} htmlFor="TaskAssignees">
          Client
        </label>
        <HoverDropdown
          id={"SprintClientSelect"}
          customStyles={{
            maxHeight: "300px",
            overflowY: "scroll",
          }}
          buttonContent={
            <Typography variant="body2">
              {selectedClient ? selectedClient.client_name : "Select Client"}
            </Typography>
          }
          dropdownContent={
            <>
              {clients ? (
                clients.map((client, index) => {
                  return (
                    <div
                      key={`client_${index}`}
                      onClick={() => handleClientSelect(client)}
                      className={`${styles.HoverDropdownContentChildren} ${
                        clients.some(
                          (c) => c.client_id === selectedClient?.client_id
                        )
                          ? styles.Selected
                          : ""
                      }`}
                    >
                      <Typography variant="body2">
                        {client.client_name}
                      </Typography>
                      <Typography color={"#a1a1a1"} variant="caption">
                        {client.client_poc.client_user_email}
                      </Typography>
                    </div>
                  );
                })
              ) : (
                <div className={styles.HoverDropdownContentChildren}>
                  <Typography variant="body2">No Clients Found</Typography>
                </div>
              )}
            </>
          }
        />
      </div>
      <div className={styles.SprintInput}>
        <label className={styles.SprintLabel} htmlFor="TaskAssignees">
          Project
        </label>
        {filteredProjects?.length > 0 ? (
          <HoverDropdown
            id={"SprintClientSelect"}
            customStyles={{
              maxHeight: "300px",
              overflowY: "scroll",
            }}
            buttonContent={
              <Typography variant="body2">
                {selectedProject ? selectedProject.title : "Select Project"}
              </Typography>
            }
            dropdownContent={
              <>
                {filteredProjects ? (
                  filteredProjects.map((project, index) => {
                    return (
                      <div
                        key={`project_${index}`}
                        onClick={() => handleProjectSelect(project)}
                        className={`${styles.HoverDropdownContentChildren} ${
                          selectedProject?.project_id === project.project_id
                            ? styles.Selected
                            : ""
                        }`}
                      >
                        <Typography variant="body2">{project.title}</Typography>
                      </div>
                    );
                  })
                ) : (
                  <div className={styles.HoverDropdownContentChildren}>
                    <Typography variant="body2">No Projects Found</Typography>
                  </div>
                )}
              </>
            }
          />
        ) : null}
      </div>
      {selectedClient && tasks ? (
        <TaskTable
          hasTimer={false}
          hasClient={false}
          searchDisabled={true}
          presetSearchTerm={`${selectedClient.client_name} ${selectedProject ? selectedProject.title : ""}`}
          handleTaskSelect={handleTaskSelect}
          selectedTasks={selectedTasks}
        />
      ) : (
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="TaskAssignees">
            Select a client to see tasks
          </label>
          <div style={{ width: "100%", height: "36px" }}>
            <Skeleton width={"100%"} height={"100%"} />
          </div>
        </div>
      )}
      <Tooltip title={tooltipMessage}>
        <button
          onClick={() => createInvoice()}
          disabled={isDisabled}
          className={styles.CreateButton}
        >
          Create Invoice
        </button>
      </Tooltip>
    </div>
  );
}
