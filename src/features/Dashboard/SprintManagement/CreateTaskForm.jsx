import { useState, useEffect, useCallback } from "react";
import styles from "../../../css/SprintManagement/CreateTaskForm.module.css";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import HoverDropdown from "../../../components/HoverDropdown";

import Typography from "@mui/material/Typography";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DocumentEditor from "../../DocumentComponents/DocumentEditor";
import DocumentCreator from "../../DocumentComponents/DocumentCreator";

import TaskDescriptionCreator from "../../DocumentComponents/TaskDescription";
import { addMemberTask } from "../../../StateManagement/Actions/actions";

import fetchWrapper from "../../../utils/fetchWrapper";
import TaskDescriptionEditor from "../../DocumentComponents/TaskDescriptionEditor";
import _ from "lodash";

export default function TaskCreate({
  toggleModal,
  taskStatus,
  selectedMember,
  isOpen,
  selectedTask,
  selectedSprint,
}) {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.app.clients);
  const organization = useSelector((state) => state.app.organization);
  const user = useSelector((state) => state.app.user);

  const [ejInstance, setEjInstance] = useState(null);

  const [selectedClient, setSelectedClient] = useState({});
  const [taskTitle, setTaskTitle] = useState("");
  const [titlePlaceholder, setTitlePlaceholder] = useState("Untitled Task");
  const [assignees, setAssignees] = useState([]);
  const [updateTask, setUpdateTask] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedEscalation, setSelectedEscalation] = useState();

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

  const handleTaskCreate = async (event) => {
    event.preventDefault();

    if (!ejInstance) {
      console.error("Editor instance is not available.");
      return;
    }

    try {
      // Save the editor content
      const editorContent = await ejInstance.save();

      // add status, client, escalation
      if (editorContent) {
        const temporary_task_id = `temporary_task_${Date.now()}`;
        const payload = {
          title: taskTitle === "" ? "Untitled Task" : taskTitle,
          assigned_by: user,
          assignees,
          description: editorContent,
          client: selectedClient || {},
          status: selectedStatus || {
            status_title: "Backlog",
          },
          escalation: selectedEscalation || {
            title: "Low",
            color: "#2EC4B6",
            softerColor: "rgba(46, 196, 182, 0.3)", // Softer color with reduced opacity
          },
          start_time: Date.now(),
          hard_limit: false,
          requires_authorization: selectedClient ? true : false,
          sprint_id: selectedSprint.sprint_id,
          organization,
          duration: 0,
          temporary_task_id,
        };

        dispatch(addMemberTask(payload));

        try {
          fetchWrapper("/tasks", localStorage.getItem("token"), "POST", {
            ...payload,
          }).then((res) => {
            const task = res.task;
            task.temporary_task_id = res.temporary_task_id;
            dispatch(addMemberTask(res.task));
            toggleModal();
          });
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
      setTitlePlaceholder(selectedTask.title)
      setAssignees(selectedTask.assignees);
      setSelectedClient(selectedTask.client);
      setSelectedStatus(selectedTask.status);
      setSelectedEscalation(selectedTask.escalation);
      setUpdateTask(true);
    }
    else if (!selectedTask) {
      setSelectedEscalation({
        title: "Low",
        color: "#2EC4B6",
        softerColor: "rgba(46, 196, 182, 0.3)", // Softer color with reduced opacity
      })
    }
  }, [isOpen, selectedTask]);

  function handleAssigneeSelect(selectedAssignee) {
    setAssignees((prevAssignees) => {
      const isAlreadySelected = prevAssignees.some(
        (assignee) => assignee.user_id === selectedAssignee.user_id
      );

      if (isAlreadySelected) {
        // Remove the assignee from the state
        return prevAssignees.filter(
          (assignee) => assignee.user_id !== selectedAssignee.user_id
        );
      } else {
        // Add the assignee to the state
        return [...prevAssignees, selectedAssignee];
      }
    });
  }

  const debouncedSetTitle = useCallback(
    _.debounce((title) => {
      setTaskTitle(title);
    }, 3000), //3000ms delay
    []
  );

  function handleTaskTitleChange(value) {
    setTitlePlaceholder(value); // Immediately set the placeholder value")
    debouncedSetTitle(value); // Debounce setting the actual task title
  }

  function handleClientSelect(value) {
    setSelectedClient(value);
  }

  function handleClientSelect(client) {
    setSelectedClient(client);
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
                <Typography variant="body1">
                  {`${assignees[0].email}${
                    assignees.length > 1
                      ? ` + ${assignees.length - 1} more`
                      : ""
                  }`}
                </Typography>
              ) : (
                <Typography variant="body1">Assignees</Typography>
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
                      <Typography variant="body1">
                        {assignee.name.first}
                      </Typography>
                      <Typography color={"#a1a1a1"} variant="caption">
                        {assignee.email}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <div className={styles.HoverDropdownContentChildren}>
                    <Typography variant="body1">Fetching Team..</Typography>
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
              <Typography variant="body1">
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
                      <Typography variant="body1">
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
                variant="body1"
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
                      <Typography variant="body1">
                        {escalation.title}
                      </Typography>
                    </div>
                  );
                })}
              </>
            }
          />
        </div>
        {clients.length > 0 ? (
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
                <Typography variant="body1">
                  {selectedClient
                    ? selectedClient.client_name
                    : "Select Client"}
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
                          <Typography variant="body1">
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
                      <Typography variant="body1">No Clients Found</Typography>
                    </div>
                  )}
                </>
              }
            />
          </div>
        ) : null}
        <button className={styles.CreateButton} onClick={handleTaskCreate}>
          {updateTask ? "Update Task" : "Create Task"}
        </button>
      </div>
    </div>
  );
}
