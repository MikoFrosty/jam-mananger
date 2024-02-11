import { useEffect, useState } from "react";
import CustomDatePicker from "../../../components/inputs/CustomDatePicker";
import styles from "../../../css/SprintManagement/CreateSprint.module.css";
import fetchWrapper from "../../../utils/fetchWrapper";
import HoverDropdown from "../../../components/HoverDropdown";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { addMemberTask, fetchClients } from "../../../StateManagement/Actions/actions";
import CreateTask from "./CreateTask";
import AddIcon from "@mui/icons-material/Add";

export default function CreateSprint() {
  const dispatch = useDispatch();
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [currentMonthStart, setCurrentMonthStart] = useState(
    new Date().getMonth()
  );
  const [tempSprintId, setTempSprintId] = useState(
    `temporary_sprint_${Date.now()}`
  );
  const [sprintTaskQueue, setSprintTaskQueue] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentYearStart, setCurrentYearStart] = useState(
    new Date().getFullYear()
  );

  const [tempTaskId, setTempTaskId] = useState(null);

  const [createTask, setCreateTask] = useState(false);

  const [taskDescription, setTaskDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState(
    selectedMember ? `${selectedMember.email}'s First Task` : "First Task"
  );

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [currentMonthEnd, setCurrentMonthEnd] = useState(new Date().getMonth());
  const [currentYearEnd, setCurrentYearEnd] = useState(
    new Date().getFullYear()
  );
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const memberTasks = useSelector((state) => state.app.memberTasks)
  const [updateTask, setUpdateTask] = useState(false);

  const [assignees, setAssignees] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({
    status_title: "To Do",
  });

  const [selectedEscalation, setSelectedEscalation] = useState({
    title: "Low",
    color: "#2EC4B6",
    softerColor: "rgba(46, 196, 182, 0.3)", // Softer color with reduced opacity
  });

  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    fetchWrapper("/organization", localStorage.getItem("token"), "GET").then(
      (res) => {
        setOrganization(res.organization);
        const initialUser = res.organization.members.find(
          (member) =>
            member.user_id === JSON.parse(localStorage.getItem("user"))?.user_id
        );

        if (initialUser) {
          setSelectedMember(initialUser);
          setMemberTasks(initialUser.tasks);
          setAssignees([initialUser]);
        } else {
          console.log("no initial user");
        }
      }
    );

    dispatch(fetchClients());
  }, []);

  function handleStatusSelect(status) {
    if (selectedStatus && selectedStatus.status_title === status.status_title) {
      setSelectedStatus({
        status_title: "To Do",
      });
    } else {
      setSelectedStatus(status);
    }
  }

  function handleEscalationSelection(escalation) {
    if (selectedEscalation && selectedEscalation.title === escalation.title) {
      setSelectedEscalation({
        title: "Low",
        color: "#2EC4B6",
      });
    } else {
      setSelectedEscalation(escalation);
    }
  }

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

  function handleMemberSelect(member) {
    setSelectedMember(member);

    const payload = {
      email: selectedMember.email,
    };

    fetchWrapper("/tasks", localStorage.getItem("token"), "GET", {
      ...payload,
    }).then((res) => {
      setMemberTasks(res.tasks);
    });
  }

  const handleStartDateSelect = (day) => {
    const newStartDate = new Date(currentYearStart, currentMonthStart, day);
    setSelectedStartDate(newStartDate);

    // Calculate two weeks ahead for default end date
    const defaultEndDate = new Date(newStartDate);
    defaultEndDate.setDate(defaultEndDate.getDate() + 14); // Add 14 days

    setSelectedEndDate(defaultEndDate);
    // Ensure to update currentMonthEnd and currentYearEnd if necessary
    setCurrentMonthEnd(defaultEndDate.getMonth());
    setCurrentYearEnd(defaultEndDate.getFullYear());
  };

  function handleTaskCreate() {
    const temporary_task_id = tempTaskId
      ? tempTaskId
      : `temporary_task_${Date.now()}`;
    const payload = {
      title: taskTitle,
      assigned_by: JSON.parse(localStorage.getItem("user")),
      assignees,
      description: taskDescription,
      client: selectedClient,
      escalation: selectedEscalation,
      status: selectedStatus,
      start_time: Date.now(),
      duration: 0,
      hard_limit: false,
      requires_authorization: selectedClient ? true : false,
      temporary_sprint_id: tempSprintId,
      temporary_task_id,
    };

    dispatch(addMemberTask(payload))

    setCreateTask(false);
    setUpdateTask(false);
    setTempTaskId(null);
  }

  function handleTaskCreateToggleWithExisting(task) {
    setCreateTask(true);
    setUpdateTask(true);
    setSelectedClient(task.client);
    setAssignees(task.assignees);
    setTaskDescription(task.description);
    setSelectedEscalation(task.escalation);
    setSelectedStatus(task.status);
    setTempTaskId(task.temporary_task_id);
    setTaskTitle(task.title);
  }

  function handleTaskTitleChange(value) {
    setTaskTitle(value);
  }

  function handleCreateTaskToggle(status) {
    setCreateTask(true);
    setSelectedStatus(status);
    setTaskTitle("Task Title");
  }

  function handleTaskDescriptionChange(value) {
    setTaskDescription(value);
  }

  function handleTitleChange(value) {
    setTaskTitle(value);
  }

  const goToPrevMonthStart = () => {
    setCurrentMonthStart(currentMonthStart === 0 ? 11 : currentMonthStart - 1);
    if (currentMonthStart === 0) {
      setCurrentYearStart(currentYearStart - 1);
    }
  };

  const goToNextMonthStart = () => {
    setCurrentMonthStart(currentMonthStart === 11 ? 0 : currentMonthStart + 1);
    if (currentMonthStart === 11) {
      setCurrentYearStart(currentYearStart + 1);
    }
  };
  const handleEndDateSelect = (day) => {
    setSelectedEndDate(new Date(currentYearEnd, currentMonthEnd, day));
  };

  const goToPrevMonthEnd = () => {
    setCurrentMonthEnd(currentMonthEnd === 0 ? 11 : currentMonthEnd - 1);
    if (currentMonthEnd === 0) {
      setCurrentYearEnd(currentYearEnd - 1);
    }
  };

  const goToNextMonthEnd = () => {
    setCurrentMonthEnd(currentMonthEnd === 11 ? 0 : currentMonthEnd + 1);
    if (currentMonthEnd === 11) {
      setCurrentYearEnd(currentYearEnd + 1);
    }
  };

  function handleClientSelect(client) {
    if (selectedClient && client.client_id === selectedClient.client_id) {
      setSelectedClient(null);
    } else {
      setSelectedClient(client);
    }
  };

  console.log(memberTasks)

  return (
    <div className={styles.CreateSprint}>
      <div className={styles.SprintTitle}>
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="SprintTitleInput">
            Sprint Name
          </label>
          <input
            id="SprintTitleInput"
            className={styles.SprintTitleInput}
            defaultValue={`New Sprint`}
            onChange={handleTitleChange}
            type="text"
          />
        </div>
      </div>
      <div className={styles.SprintTimeline}>
        <div
          className={styles.SprintInput}
          onMouseEnter={() => setIsStartDatePickerVisible(true)}
          onMouseLeave={() => setIsStartDatePickerVisible(false)}
        >
          <label className={styles.SprintLabel} htmlFor="SprintStartDate">
            Start Date
          </label>
          {isStartDatePickerVisible ? (
            <>
              <div className={styles.HoverInput}>
                {selectedStartDate ? (
                  <span>{selectedStartDate.toLocaleDateString()}</span>
                ) : (
                  <span>Hover to select a date</span>
                )}
              </div>
              <CustomDatePicker
                currentMonth={currentMonthStart}
                currentYear={currentYearStart}
                goToNextMonth={goToNextMonthStart}
                goToPrevMonth={goToPrevMonthStart}
                handleDateSelect={handleStartDateSelect}
                selectedDate={selectedStartDate}
                isVisible={isStartDatePickerVisible}
              />
            </>
          ) : (
            <div className={styles.HoverInput}>
              {selectedStartDate ? (
                <span>{selectedStartDate.toLocaleDateString()}</span>
              ) : (
                <span>Hover to select a date</span>
              )}
            </div>
          )}
        </div>
        <div
          className={styles.SprintInput}
          onMouseEnter={() => setIsEndDatePickerVisible(true)}
          onMouseLeave={() => setIsEndDatePickerVisible(false)}
        >
          <label className={styles.SprintLabel} htmlFor="SprintEndDate">
            End Date
          </label>
          {isEndDatePickerVisible ? (
            <>
              <div className={styles.HoverInput}>
                {selectedEndDate ? (
                  <span>{selectedEndDate.toLocaleDateString()}</span>
                ) : (
                  <span>Hover to select a date</span>
                )}
              </div>
              <CustomDatePicker
                currentMonth={currentMonthEnd}
                currentYear={currentYearEnd}
                goToNextMonth={goToNextMonthEnd}
                goToPrevMonth={goToPrevMonthEnd}
                handleDateSelect={handleEndDateSelect}
                selectedDate={selectedEndDate}
                isVisible={isEndDatePickerVisible}
                minDate={selectedStartDate}
              />
            </>
          ) : (
            <div className={styles.HoverInput}>
              {selectedEndDate ? (
                <span>{selectedEndDate.toLocaleDateString()}</span>
              ) : (
                <span>Hover to select a date</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.SprintDescription}>
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="SprintEndDate">
            Description
          </label>
          <textarea
            id="SprintDescription"
            rows={4}
            className={styles.Description}
          />
        </div>
      </div>
      <div className={styles.StrategicObjective}>
        <label className={styles.SprintLabel} htmlFor="SprintEndDate">
          Strategic Objective
        </label>
        <textarea
          id="SprintObjective"
          maxLength={120}
          rows={1}
          className={styles.Description}
        />
        <label className={styles.SprintLabelFooter} htmlFor="SprintEndDate">
          Strategic Objectives represent the overall objective for this sprint.
          They should be simple like - "refine backend scope and launch v2 ui".
        </label>
      </div>
      <div className={styles.TaskManager}>
        <label
          style={{ alignSelf: "end" }}
          className={styles.SprintLabel}
          htmlFor="SprintEndDate"
        >
          Manage Tasks
        </label>
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="TaskMemberSelect">
            Select Team Member
          </label>
          <HoverDropdown
            id={"TaskMemberSelect"}
            customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
            buttonContent={
              <Typography variant="body1">
                {selectedMember ? selectedMember.email : "Team"}
              </Typography>
            }
            dropdownContent={
              <>
                {organization ? (
                  organization.members.map((member, index) => {
                    return (
                      <div
                        key={`member_${index}`}
                        onClick={() => handleMemberSelect(member)}
                        // add css styling
                        className={`${styles.HoverDropdownContentChildren} ${
                          member?.user_id === selectedMember?.user_id
                            ? styles.Selected
                            : ""
                        }`}
                      >
                        <Typography variant="body1">{member.name}</Typography>
                        <Typography color={"#a1a1a1"} variant="caption">
                          {member.email}
                        </Typography>
                      </div>
                    );
                  })
                ) : (
                  <div className={styles.HoverDropdownContentChildren}>
                    <Typography variant="body1">Fetching Team..</Typography>
                    <Typography color={"#a1a1a1"} variant="caption">
                      We are gathering your teammates!
                    </Typography>
                  </div>
                )}
              </>
            }
          />
        </div>
        <div className={styles.TaskList}>
          {memberTasks?.length === 0 ? (
            <div className={styles.TaskView}>
              <h6>{`No Tasks Found for ${selectedMember?.email}`}</h6>
              <CreateTask
                selectedMember={selectedMember}
                assignees={assignees}
                organization={organization}
                handleAssigneeSelect={handleAssigneeSelect}
                handleClientSelect={handleClientSelect}
                selectedClient={selectedClient}
                handleStatusSelect={handleStatusSelect}
                selectedStatus={selectedStatus}
                selectedEscalation={selectedEscalation}
                handleEscalationSelect={handleEscalationSelection}
                handleTaskDescriptionChange={handleTaskDescriptionChange}
                handleTaskCreate={handleTaskCreate}
                handleTitleChange={handleTaskTitleChange}
                updateTask={updateTask}
              />
            </div>
          ) : selectedMember && createTask === false ? (
            <>
              <div className={styles.KanBan}>
                <div className={styles.KanBanColumn}>
                  <label className={styles.SprintLabel} htmlFor="BacklogColumn">
                    Backlog
                  </label>
                  <div className={styles.KanBanCard}>
                    <AddIcon
                      className={styles.Icon}
                      onClick={() =>
                        handleCreateTaskToggle({
                          status_title: "Backlog",
                        })
                      }
                    />
                  </div>
                  {memberTasks?.map((task) => {
                    if (task.status.status_title === "Backlog") {
                      return (
                        <div
                          onClick={() =>
                            handleTaskCreateToggleWithExisting(task)
                          }
                          className={styles.KanBanCard}
                        >
                          <div className={styles.KanBanCardTextRow}>
                            <Typography variant="body1">
                              {task.title}
                            </Typography>
                            <Typography variant="caption">
                              {task.client?.client_name}
                            </Typography>
                          </div>
                          <Typography
                            sx={{
                              backgroundColor: task.escalation.softerColor,
                              color: task.escalation.color,
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                            variant="caption"
                          ></Typography>
                        </div>
                      );
                    }
                    return null; // Ensure tasks not matching the condition are handled properly
                  })}
                </div>
                <div className={styles.KanBanColumn}>
                  <label className={styles.SprintLabel} htmlFor="BacklogColumn">
                    To Do
                  </label>
                  <div className={styles.KanBanCard}>
                    <AddIcon
                      className={styles.Icon}
                      onClick={() =>
                        handleCreateTaskToggle({
                          status_title: "To Do",
                        })
                      }
                    />
                  </div>
                  {memberTasks?.map((task) => {
                    if (task.status.status_title === "To Do") {
                      return (
                        <div
                          onClick={() =>
                            handleTaskCreateToggleWithExisting(task)
                          }
                          className={styles.KanBanCard}
                        >
                          <div className={styles.KanBanCardTextRow}>
                            <Typography variant="body1">
                              {task.title}
                            </Typography>
                            <Typography variant="caption">
                              {task.client?.client_name}
                            </Typography>
                          </div>
                          <Typography
                            sx={{
                              backgroundColor: task.escalation.softerColor,
                              color: task.escalation.color,
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                            variant="caption"
                          ></Typography>
                        </div>
                      );
                    }
                    return null; // Ensure tasks not matching the condition are handled properly
                  })}
                </div>
                <div className={styles.KanBanColumn}>
                  <label className={styles.SprintLabel} htmlFor="BacklogColumn">
                    In Progress
                  </label>
                  <div className={styles.KanBanCard}>
                    <AddIcon
                      className={styles.Icon}
                      onClick={() =>
                        handleCreateTaskToggle({
                          status_title: "In Progress",
                        })
                      }
                    />
                  </div>
                  {memberTasks?.map((task) => {
                    if (task.status.status_title === "In Progress") {
                      return (
                        <div
                          onClick={() =>
                            handleTaskCreateToggleWithExisting(task)
                          }
                          className={styles.KanBanCard}
                        >
                          <div className={styles.KanBanCardTextRow}>
                            <Typography variant="body1">
                              {task.title}
                            </Typography>
                            <Typography variant="caption">
                              {task.client?.client_name}
                            </Typography>
                          </div>
                          <Typography
                            sx={{
                              backgroundColor: task.escalation.softerColor,
                              color: task.escalation.color,
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                            variant="caption"
                          ></Typography>
                        </div>
                      );
                    }
                    return null; // Ensure tasks not matching the condition are handled properly
                  })}
                </div>
                <div className={styles.KanBanColumn}>
                  <label className={styles.SprintLabel} htmlFor="BacklogColumn">
                    Done
                  </label>
                  <div className={styles.KanBanCard}>
                    <AddIcon
                      className={styles.Icon}
                      onClick={() =>
                        handleCreateTaskToggle({
                          status_title: "Done",
                        })
                      }
                    />
                  </div>
                  {memberTasks?.map((task) => {
                    if (task.status.status_title === "Done") {
                      return (
                        <div
                          onClick={() =>
                            handleTaskCreateToggleWithExisting(task)
                          }
                          className={styles.KanBanCard}
                        >
                          <div className={styles.KanBanCardTextRow}>
                            <Typography variant="body1">
                              {task.title}
                            </Typography>
                            <Typography variant="caption">
                              {task.client?.client_name}
                            </Typography>
                          </div>
                          <Typography
                            sx={{
                              backgroundColor: task.escalation.softerColor,
                              color: task.escalation.color,
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                            variant="caption"
                          ></Typography>
                        </div>
                      );
                    }
                    return null; // Ensure tasks not matching the condition are handled properly
                  })}
                </div>
              </div>
            </>
          ) : createTask === true ? (
            <CreateTask
              selectedMember={selectedMember}
              assignees={assignees}
              organization={organization}
              handleAssigneeSelect={handleAssigneeSelect}
              handleClientSelect={handleClientSelect}
              selectedClient={selectedClient}
              handleStatusSelect={handleStatusSelect}
              selectedStatus={selectedStatus}
              selectedEscalation={selectedEscalation}
              handleEscalationSelect={handleEscalationSelection}
              handleTaskDescriptionChange={handleTaskDescriptionChange}
              handleTaskCreate={handleTaskCreate}
              handleTitleChange={handleTaskTitleChange}
              taskTitle={taskTitle}
              updateTask={updateTask}
            />
          ) : (
            <h6>Please Select a Team Member to Manage Sprint Tasks</h6>
          )}
        </div>
      </div>
    </div>
  );
}
