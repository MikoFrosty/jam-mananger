import { useEffect, useState } from "react";
import CustomDatePicker from "../../../components/inputs/CustomDatePicker";
import styles from "../../../css/SprintManagement/CreateSprint.module.css";
import fetchWrapper from "../../../utils/fetchWrapper";
import HoverDropdown from "../../../components/HoverDropdown";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  addMemberTask,
  fetchClients,
  fetchTasks,
  getOrganization,
} from "../../../StateManagement/Actions/actions";

export default function CreateSprint() {
  const dispatch = useDispatch();
  const editingSprint = useSelector((state) => state.app.editing_sprint);
  const memberTasks = useSelector((state) => state.app.memberTasks);
  const organization = useSelector((state) => state.app.organization);
  const clients = useSelector((state) => state.app.clients);

  const [selectedMember, setSelectedMember] = useState({
    email: "All",
    user_id: "all",
  });

  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [currentMonthStart, setCurrentMonthStart] = useState(
    new Date().getMonth()
  );

  const [sprintTaskQueue, setSprintTaskQueue] = useState([]);

  const [currentYearStart, setCurrentYearStart] = useState(
    new Date().getFullYear()
  );

  const [tempTaskId, setTempTaskId] = useState(null);

  const [createTask, setCreateTask] = useState(false);

  const [taskDescription, setTaskDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState(
    selectedMember ? `${selectedMember.email}'s First Task` : "First Task"
  );

  const [sprintTitle, setSprintTitle] = useState("");
  const [sprintDescription, setSprintDescription] = useState("")
  const [objective, setObjective] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [currentMonthEnd, setCurrentMonthEnd] = useState(new Date().getMonth());
  const [currentYearEnd, setCurrentYearEnd] = useState(
    new Date().getFullYear()
  );
  const [selectedEndDate, setSelectedEndDate] = useState(null);
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

  useEffect(() => {
    if (!organization) {
      dispatch(getOrganization());
    }
    if (!clients) {
      dispatch(fetchClients());
    }
    if (editingSprint) {
      dispatch(fetchTasks({
        email: "All",
        sprint_id: editingSprint.sprint_id
      }))
    }
  }, [editingSprint]);

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
    if (member.user_id === "all") {
      dispatch(fetchTasks({ email: "All" }));
      setSelectedMember(member);
    }
    setSelectedMember(member);
    dispatch(fetchTasks({ email: member.email }));
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

    console.log(assignees);

    const payload = {
      title: taskTitle,
      assigned_by: JSON.parse(localStorage.getItem("user")),
      assignees,
      description: taskDescription,
      client: selectedClient,
      status: selectedStatus,
      escalation: selectedEscalation,
      start_time: Date.now(),
      duration: 0,
      hard_limit: false,
      requires_authorization: selectedClient ? true : false,
      sprint_id: editingSprint.sprint_id,
      organization,
      temporary_task_id,
    };

    dispatch(addMemberTask(payload));

    try {
      fetchWrapper(
        "/tasks",
        localStorage.getItem("token"),
        "POST",
        { ...payload }
      ).then((res) => {
        const task = res.task;
        task.temporary_task_id = res.temporary_task_id;
        dispatch(addMemberTask(res.task));
        setCreateTask(false)
      });
    } catch (error) {
      console.log(error);
    }
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
  }

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
                <div
                  key="all_members_option"
                  onClick={() =>
                    handleMemberSelect({ email: "All", user_id: "all" })
                  }
                  className={`${styles.HoverDropdownContentChildren} ${
                    selectedMember?.user_id === "all" ? styles.Selected : ""
                  }`}
                >
                  <Typography variant="body1">All Members</Typography>
                </div>
                {organization ? (
                  organization.members.map((member, index) => {
                    return (
                      <div
                        key={`member_${index}`}
                        onClick={() => handleMemberSelect(member)}
                        className={`${styles.HoverDropdownContentChildren} ${
                          member?.user_id === selectedMember?.user_id
                            ? styles.Selected
                            : ""
                        }`}
                      >
                        <Typography variant="body1">{`${member.name.first} ${member.name.last}`}</Typography>
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
          <div className={styles.AllTasks}></div>
        </div>
      </div>
    </div>
  );
}
