import { useEffect, useState } from "react";
import CustomDatePicker from "../../../components/inputs/CustomDatePicker";
import styles from "../../../css/SprintManagement/CreateSprint.module.css";
import fetchWrapper from "../../../utils/fetchWrapper";
import HoverDropdown from "../../../components/HoverDropdown";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchClients } from "../../../StateManagement/Actions/actions";
import CreateTask from "./CreateTask";

export default function CreateSprint() {
  const dispatch = useDispatch();
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [currentMonthStart, setCurrentMonthStart] = useState(
    new Date().getMonth()
  );
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentYearStart, setCurrentYearStart] = useState(
    new Date().getFullYear()
  );

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [currentMonthEnd, setCurrentMonthEnd] = useState(new Date().getMonth());
  const [currentYearEnd, setCurrentYearEnd] = useState(
    new Date().getFullYear()
  );
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [memberTasks, setMemberTasks] = useState([]);

  const [assignees, setAssignees] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({
    status_title: "To Do",
  });
  const [selectedEscalation, setSelectedEscalation] = useState({
    title: "Low",
    color: "#2EC4B6",
    softerColor: "rgba(46, 196, 182, 0.3)" // Softer color with reduced opacity
  });

  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    fetchWrapper("/organization", localStorage.getItem("token"), "GET").then(
      (res) => {
        setOrganization(res.organization);
        console.log(res.organization);
        const initialUser = res.organization.members.find(
          (member) =>
            member.user_id === JSON.parse(localStorage.getItem("user"))?.user_id
        );

        if (initialUser) {
          console.log(initialUser);
          setSelectedMember(initialUser);
          setMemberTasks(initialUser.tasks);
          setAssignees([...assignees, initialUser]);
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
      })
    } else {
      setSelectedEscalation(escalation)
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
      console.log(res.tasks);
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
        {/* <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="DurationDropdown">Duration</label>
          <div className={styles.DurationInputWrapper}>
            <input
              id="DurationInput"
              className={styles.DurationInput}
              type="number"
              min="1" // Assuming the minimum duration is 1 day/week/month
              placeholder="Enter duration"
            />
            <select className={styles.DurationDropdown} defaultValue="weeks">
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div> */}
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
                  <div
                    // add css styling
                    className={styles.HoverDropdownContentChildren}
                  >
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
          {memberTasks.length === 0 ? (
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
              />
            </div>
          ) : selectedMember ? (
            memberTasks?.map((task) => {
              return (
                <>
                  <h6>{JSON.stringify(task)}</h6>
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
                  />
                </>
              );
            })
          ) : (
            <h6>Please Select a Team Member to Manage Sprint Tasks</h6>
          )}
        </div>
      </div>
    </div>
  );
}
