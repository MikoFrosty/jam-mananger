import styles from "../../../css/SprintManagement/CreateTask.module.css";

import HoverDropdown from "../../../components/HoverDropdown";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../../StateManagement/Actions/actions";
import { useEffect } from "react";
import RichTextEditor from "../../DocumentComponents/RichTextEditor";

export default function CreateTask({
  selectedMember,
  assignees,
  organization,
  handleAssigneeSelect,
  handleClientSelect,
  selectedClient,
  handleStatusSelect,
  selectedStatus,
  selectedEscalation,
  handleEscalationSelect
}) {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.app.clients);
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
      softerColor: "rgba(46, 196, 182, 0.3)" // Softer color with reduced opacity
    },
    {
      title: "Moderate",
      color: "#FFC914",
      softerColor: "rgba(255, 201, 20, 0.3)"
    },
    {
      title: "High",
      color: "#FF9F1C",
      softerColor: "rgba(255, 159, 28, 0.3)"
    },
    {
      title: "Severe",
      color: "#F5511F",
      softerColor: "rgba(245, 81, 31, 0.3)"
    }
  ];

  useEffect(() => {
    dispatch(fetchClients());
  }, []);

  return (
    <div className={styles.CreateTask}>
      <div className={styles.InputRow}>
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="TaskTitleInput">
            Task Title
          </label>
          <input
            id="TaskTitleInput"
            className={styles.SprintTitleInput}
            defaultValue={
              selectedMember
                ? `${selectedMember.email}'s First Task`
                : "First Task"
            }
            type="text"
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
              <Typography sx={{padding: "1px 5px 1px 5px", borderRadius: "5px"}} backgroundColor={selectedEscalation.softerColor} variant="body1">
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
                      style={{backgroundColor: escalation.softerColor}}
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
      </div>
      <div className={styles.InputRow}>
        <div className={styles.SprintInput}>
          <label className={styles.SprintLabel} htmlFor="TaskAssignees">
            Assignees
          </label>
          <HoverDropdown
            customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
            buttonContent={
              assignees.length > 0 ? (
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
                      <Typography variant="body1">{assignee.name}</Typography>
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
          <label className={styles.SprintLabel} htmlFor="SprintClientSelect">
            Client
          </label>
          {clients.length > 0 ? (
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
          ) : null}
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
      </div>
      {/* <RichTextEditor /> */}
    </div>
  );
}
