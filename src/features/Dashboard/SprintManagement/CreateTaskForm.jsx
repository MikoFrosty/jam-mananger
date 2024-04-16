import { useState, useEffect, useCallback } from "react";
import styles from "../../../css/SprintManagement/CreateTaskForm.module.css";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import HoverDropdown from "../../../components/HoverDropdown";

import Timer from "../../../components/inputs/Timer";

import Typography from "@mui/material/Typography";
import "react-loading-skeleton/dist/skeleton.css";

import TaskDescriptionCreator from "../../DocumentComponents/TaskDescription";
import {
  addMemberTask,
  deleteTasks,
  fetchClients,
  fetchPartners,
  fetchProjects,
  getOrganization,
  setSelectedMemberTasks,
} from "../../../StateManagement/Actions/actions";

import fetchWrapper from "../../../utils/fetchWrapper";
import TaskDescriptionEditor from "../../DocumentComponents/TaskDescriptionEditor";
import _ from "lodash";

export default function TaskCreate({
  toggleModal,
  taskStatus,
  isOpen,
  selectedTask,
  type,
}) {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.app.clients);
  const projects = useSelector((state) => state.app.projects);
  const currentOrg = useSelector((state) => state.app.organization);
  const [organization, setOrganization] = useState(currentOrg);
  const clientPartner = useSelector((state) => state.app.client_partner);
  const user = useSelector((state) => state.app.user);
  const clientUser = useSelector((state) => state.app.client_user);

  const [filteredClients, setFilteredClients] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(null);
  const [refetchProjects, setRefetchProjects] = useState(false);

  const selectedMember = useSelector((state) => state.app.selectedMember_Tasks);

  const [ejInstance, setEjInstance] = useState(null);

  const [selectedClient, setSelectedClient] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [titlePlaceholder, setTitlePlaceholder] = useState("Untitled Task");
  const [assignees, setAssignees] = useState([]);
  const [updateTask, setUpdateTask] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedEscalation, setSelectedEscalation] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (type) {
      if (type === "user") {
        dispatch(getOrganization());
        if (!clients && type === "user") {
          dispatch(fetchClients());
        }
      } else if (type === "client") {
        dispatch(fetchPartners());
      }
    }
  }, [type]);

  const statusOptions = [
    {
      status_title: "Backlog",
    },
    {
      status_title: "To Do",
    },
    {
      status_title: "In Progress",
    },
    {
      status_title: "Done",
    },
  ];

  const escalations = [
    {
      title: "Low",
      color: "#2EC4B6",
      softerColor: "rgba(46, 196, 182, 0.3)", // Softer color with reduced opacity
    },
    {
      title: "Moderate",
      color: "#FFC914",
      softerColor: "rgba(255, 201, 20, 0.3)",
    },
    {
      title: "High",
      color: "#FF9F1C",
      softerColor: "rgba(255, 159, 28, 0.3)",
    },
    {
      title: "Severe",
      color: "#F5511F",
      softerColor: "rgba(245, 81, 31, 0.3)",
    },
  ];

  useEffect(() => {
    if (clients) {
      setFilteredClients(clients)
    } else if (type === "user") {
      dispatch(fetchClients());
    }

    if (!projects) {
      dispatch(fetchProjects());
    } else {
      console.log("Projects", projects)
    }
  }, [clients, projects])

  useEffect(() => {
    if (!projects || refetchProjects) {
      dispatch(fetchProjects());
      setRefetchProjects(false);
    }
  }, [projects, refetchProjects]);

  useEffect(() => {
    if (isOpen) {
      setRefetchProjects(true);
    }
  }, [isOpen])

  useEffect(() => {
    if (clientUser) {
      if (!organization) {
        setOrganization(clientUser.client.associated_org);
      }
      const associated_client = {
        client_id: clientUser.client.client_id,
        client_name: clientUser.client.client_name,
        org_poc: clientUser.client.org_poc,
      };
      setSelectedClient(associated_client);
    }
  }, [clientUser]);

  useEffect(() => {
    if (selectedProject && clients) {
      const theseClients = type === "user" ? clients.filter((client) => selectedProject.client.client_id === client.client_id) : projects;

      setFilteredClients(theseClients);
    }
  }, [selectedProject])

  useEffect(() => {
    if (selectedClient && projects) {
      const theseProjects = projects.filter((project) => project.client.client_id === selectedClient.client_id);

      setFilteredProjects(theseProjects);
    }
  }, [selectedClient, projects])

  useEffect(() => {
    if (selectedMember?.email === "All" && assignees) {
      dispatch(setSelectedMemberTasks(assignees[0]));
    }
  }, [selectedMember]);

  const handleTaskCreate = async (event) => {
    event.preventDefault();

    if (!ejInstance) {
      console.error("Editor instance is not available.");
      return;
    }

    try {
      // Save the editor content
      const editorContent = await ejInstance.save();

      const assigned_by = type === "user" ? user : clientUser;

      // add status, client, escalation
      if (editorContent) {
        const temporary_task_id = `temporary_task_${Date.now()}`;
        const payload = {
          title: taskTitle === "" ? "Untitled Task" : taskTitle,
          assigned_by: assigned_by,
          assignees,
          description: editorContent,
          status: selectedStatus || {
            status_title: "Backlog",
          },
          escalation: selectedEscalation || {
            title: "Low",
            color: "#2EC4B6",
            softerColor: "rgba(46, 196, 182, 0.3)", // Softer color with reduced opacity
          },
          start_time: Date.now(),
          project: selectedProject,
          hard_limit: false,
          requires_authorization: selectedClient ? true : false,
          // sprint_id: selectedSprint.sprint_id,
          organization: {
            name: organization.name,
            members: organization.members,
            org_id: organization.org_id,
          },
          duration: 0,
          temporary_task_id,
        };

        dispatch(addMemberTask(payload));
        try {
          if (selectedClient) {
            fetchWrapper("/tasks", localStorage.getItem("token"), "POST", {
              ...payload,
              client: {
                client_id: selectedClient.client_id,
                client_name: selectedClient.client_name,
                org_poc: selectedClient.org_poc,
              },
            }).then((res) => {
              const task = res.task;
              task.temporary_task_id = res.temporary_task_id;
              dispatch(addMemberTask(res.task));
              toggleModal();
            });
          } else {
            fetchWrapper("/tasks", localStorage.getItem("token"), "POST", {
              ...payload,
            }).then((res) => {
              const task = res.task;
              console.log(res);
              task.temporary_task_id = res.temporary_task_id;
              dispatch(addMemberTask(res.task));
              toggleModal();
            });
          }
        } catch (error) {
          console.log(error);
        }
      }

      // Here you can combine `editorContent` with other task details and send to your backend
    } catch (error) {
      console.error("Failed to save the editor content", error);
    }
  };

  useEffect(() => {
    if (taskStatus) {
      setSelectedStatus(taskStatus);
    }
    if (selectedMember) {
      setAssignees([selectedMember]);
    }
    if (taskStatus) {
      setSelectedStatus(taskStatus);
    }
  }, [taskStatus, selectedMember, taskStatus]);

  useEffect(() => {
    if (!isOpen) {
      setTaskTitle("");
      setSelectedStatus(null);
      setSelectedEscalation(null);
    }
    if (selectedTask) {
      setTaskTitle(selectedTask.title);
      setTitlePlaceholder(selectedTask.title);
      setAssignees(selectedTask.assignees);
      setSelectedClient(selectedTask.client);
      setSelectedStatus(selectedTask.status);
      setSelectedEscalation(selectedTask.escalation);
      setSelectedProject(selectedTask.project);
      setUpdateTask(true);
    } else if (!selectedTask) {
      setSelectedEscalation({
        title: "Low",
        color: "#2EC4B6",
        softerColor: "rgba(46, 196, 182, 0.3)", // Softer color with reduced opacity
      });
    }
  }, [isOpen, selectedTask]);

  function handleAssigneeSelect(selectedAssignee) {
    setAssignees((prevAssignees) => {
      const isAlreadySelected = prevAssignees.some(
        (assignee) => assignee.user_id === selectedAssignee.user_id
      );

      // Check if there's an assignee with the email "All"
      const allAssigneeIndex = prevAssignees.findIndex(
        (assignee) => assignee.email === "All"
      );

      if (isAlreadySelected) {
        // If the selected assignee is the only one and is being deselected
        if (prevAssignees.length === 1) {
          // Set the assignee to "All"
          return [{ email: "All", name: "All" }];
        } else {
          // Remove the assignee from the state
          return prevAssignees.filter(
            (assignee) => assignee.user_id !== selectedAssignee.user_id
          );
        }
      } else {
        // If a new assignee is selected and there's an assignee with email "All"
        if (allAssigneeIndex !== -1) {
          // Remove the "All" assignee from the state
          const updatedAssignees = [...prevAssignees];
          updatedAssignees.splice(allAssigneeIndex, 1);
          return [...updatedAssignees, selectedAssignee];
        } else {
          // Add the assignee to the state
          return [...prevAssignees, selectedAssignee];
        }
      }
    });
  }

  function handleProjectSelect(project) {
    if (selectedClient) {
      if (project?.client.client_id === selectedClient.client_id) {
        setSelectedProject(project)
      }
    }
  }

  const debouncedSetTitle = useCallback(
    _.debounce((title) => {
      setTaskTitle(title);
    }, 3000), //3000ms delay
    []
  );

  function handleTaskDelete() {
    const payload = {
      task_ids: [selectedTask.task_id],
      type: "one",
    };
    fetchWrapper("/tasks", localStorage.getItem("token"), "DELETE", {
      ...payload,
    }).then((res) => {
      dispatch(deleteTasks(res.requested_resource.resource));
      toggleModal();
    });
  }

  function handleTaskTitleChange(value) {
    setTitlePlaceholder(value); // Immediately set the placeholder value")
    debouncedSetTitle(value); // Debounce setting the actual task title
  }

  function handleClientSelect(value) {
    if (value.client_id === selectedClient?.client_id) {
      setSelectedClient(null);
    } else {
      setSelectedClient(value);
    }
  }

  function handleProjectSelect(value) {
    if (value.project_id === selectedProject?.project_id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(value);
    }
  }

  function handleStatusSelect(status) {
    setSelectedStatus(status);
  }

  function handleEscalationSelect(escalation) {
    setSelectedEscalation(escalation);
  }

  return (
    <div className={styles.TaskCreation}>
      {selectedTask ? (
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="TaskAssignees">
            Notes
          </label>
          <TaskDescriptionEditor
            customStyles={{ width: "500px" }}
            isOpen={isOpen}
            selectedTask={selectedTask}
            selectedEscalation={selectedEscalation}
            selectedProject={selectedProject}
            selectedClient={selectedClient}
            selectedStatus={selectedStatus}
            assignees={assignees}
            title={taskTitle}
            ejInstance={ejInstance}
            setEjInstance={setEjInstance}
          />
        </div>
      ) : (
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="TaskAssignees">
            Notes
          </label>
          <TaskDescriptionCreator
            ejInstance={ejInstance}
            setEjInstance={setEjInstance}
            isOpen={isOpen}
            customStyles={{ width: "500px" }}
            placeholder={"Add Notes"}
          />
        </div>
      )}
      <div
        className={styles.Box}
        component="form"
        onSubmit={handleTaskCreate}
        noValidate
        sx={{ mt: 1 }}
      >
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="TaskAssignees">
            Assignees
          </label>
          <HoverDropdown
            customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
            buttonContent={
              assignees && assignees.length > 0 ? (
                <Typography variant="body2">
                  {`${assignees[0].email}${
                    assignees.length > 1
                      ? ` + ${assignees.length - 1} more`
                      : ""
                  }`}
                </Typography>
              ) : (
                <Typography variant="body2">Assignees</Typography>
              )
            }
            dropdownContent={
              <>
                {organization ? (
                  organization.members.map((assignee, index) => (
                    <div
                      key={`assignee_${index}`}
                      onClick={() => handleAssigneeSelect(assignee)}
                      className={`${styles.HoverDropdownContentChildren} ${
                        assignees.some((a) => a.user_id === assignee.user_id)
                          ? styles.Selected
                          : ""
                      }`}
                    >
                      <Typography variant="body2">
                        {assignee.name.first}
                      </Typography>
                      <Typography color={"#a1a1a1"} variant="caption">
                        {assignee.email}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <div className={styles.HoverDropdownContentChildren}>
                    <Typography variant="body2">Fetching Team..</Typography>
                  </div>
                )}
              </>
            }
          />
        </div>
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="SprintTitleInput">
            Task Title
          </label>
          <input
            id="SprintTitleInput"
            className={styles.SprintTitleInput}
            value={titlePlaceholder}
            onChange={(e) => handleTaskTitleChange(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="SprintClientSelect">
            Status
          </label>
          <HoverDropdown
            id={"SprintClientSelect"}
            customStyles={{
              maxHeight: "300px",
              overflowY: "scroll",
            }}
            buttonContent={
              <Typography variant="body2">
                {selectedStatus ? selectedStatus.status_title : "Status"}
              </Typography>
            }
            dropdownContent={
              <>
                {statusOptions.map((option, index) => {
                  return (
                    <div
                      key={`status_${index}`}
                      onClick={() => handleStatusSelect(option)}
                      className={`${styles.HoverDropdownContentChildren} ${
                        option.status_title === selectedStatus?.status_title
                          ? styles.Selected
                          : ""
                      }`}
                    >
                      <Typography variant="body2">
                        {option.status_title}
                      </Typography>
                    </div>
                  );
                })}
              </>
            }
          />
        </div>
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="SprintClientSelect">
            Escalation
          </label>
          <HoverDropdown
            id={"SprintClientSelect"}
            customStyles={{
              maxHeight: "300px",
              overflowY: "scroll",
            }}
            buttonContent={
              <Typography
                sx={{ padding: "1px 5px 1px 5px", borderRadius: "5px" }}
                backgroundColor={selectedEscalation?.softerColor}
                variant="body2"
              >
                {selectedEscalation ? selectedEscalation.title : "Escalation"}
              </Typography>
            }
            dropdownContent={
              <>
                {escalations.map((escalation, index) => {
                  return (
                    <div
                      key={`escalation_${index}`}
                      onClick={() => handleEscalationSelect(escalation)}
                      style={{ backgroundColor: escalation.softerColor }}
                      className={`${styles.HoverDropdownContentChildren} ${
                        escalation.title === selectedEscalation?.title
                          ? styles.Selected
                          : ""
                      }`}
                    >
                      <Typography variant="body2">
                        {escalation.title}
                      </Typography>
                    </div>
                  );
                })}
              </>
            }
          />
        </div>
        {filteredClients && filteredClients.length > 0 && type === "user" ? (
          <div className={styles.SprintInput}>
            <label className={styles.SprintLabel} htmlFor="SprintClientSelect">
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
                  {selectedClient
                    ? selectedClient.client_name
                    : "Select Client"}
                </Typography>
              }
              dropdownContent={
                <>
                  {filteredClients ? (
                    filteredClients.map((client, index) => {
                      return (
                        <div
                          key={`client_${index}`}
                          onClick={() => handleClientSelect(client)}
                          className={`${styles.HoverDropdownContentChildren} ${
                            filteredClients.some(
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
        ) : null}
        {/* below is the project selector */}
        {filteredProjects && filteredProjects.length > 0 ? (
          <div className={styles.SprintInput}>
            <label className={styles.SprintLabel} htmlFor="SprintClientSelect">
              Client Projects
            </label>
            <HoverDropdown
              id={"SprintClientSelect"}
              customStyles={{
                maxHeight: "300px",
                overflowY: "scroll",
              }}
              buttonContent={
                <Typography variant="body2">
                  {selectedProject
                    ? selectedProject.title
                    : "Select Project"}
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
                            // filteredProjects.some(
                            //   (c) => c.project_id === selectedProject?.project_id
                            // )
                            selectedProject?.project_id === project.project_id
                              ? styles.Selected
                              : ""
                          }`}
                        >
                          <Typography variant="body2">
                            {project.title}
                          </Typography>
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
          </div>
        ) : null}
        {
          updateTask ? (
            <div className={styles.SprintInput}>
              <label className={styles.SprintLabel}>Track Time</label>
              <Timer customStyles={{width: "100%", justifyContent: "space-between"}} task={selectedTask}/>
            </div>
          ) : (null)
        }
        {!updateTask ? (
          <button
            disabled={assignees.length === 0 ? true : false}
            className={styles.CreateButton}
            onClick={handleTaskCreate}
          >
            Create Task
          </button>
        ) : (
          <button onClick={handleTaskDelete} className={styles.DeleteButton}>
            Delete Task
          </button>
        )}
      </div>
    </div>
  );
}
