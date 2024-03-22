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
  fetchClients,
  fetchPartners,
  getOrganization,
  setSelectedMemberTasks,
} from "../../StateManagement/Actions/actions";

import _ from "lodash";
import TaskTable from "../Dashboard/SprintManagement/TaskTable";
import fetchWrapper from "../../utils/fetchWrapper";

export default function InvoiceCreate({ toggleModal, isOpen, type = "user" }) {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.app.clients);
  const currentOrg = useSelector((state) => state.app.organization);
  const [selectedClient, setSelectedClient] = useState(null);
  const [organization, setOrganization] = useState(currentOrg);
  const selectedMember = useSelector((state) => state.app.selectedMember_Tasks);
  const user = useSelector((state) => state.app.user);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [invoiceTitle, setInvoiceTitle] = useState("");

  useEffect(() => {
    if (clients) {
      console.log("Clients", clients);
    } else {
      dispatch(fetchClients());
    }
  }, [clients]);

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
    if (selectedTasks?.length > 0 && selectedTasks?.length < 16 && selectedClient && invoiceTitle !== "") {
      setIsDisabled(false);
    } else if (selectedTasks?.length === 0 || !selectedTasks || !selectedClient || invoiceTitle === "") {
      setIsDisabled(true);
    }
  }, [selectedClient, selectedTasks, invoiceTitle]);

  function handleClientSelect(client) {
    if (selectedClient?.client_name === client.client_name) {
      setSelectedClient(null);
    } else {
      setSelectedClient(client);
    }
  }

  function createInvoice() {
    const payload = {
      title: invoiceTitle,
      client_id: selectedClient.client_id,
      task_ids: selectedTasks.map((task) => task.task_id)
    }

    fetchWrapper("/invoices", localStorage.getItem("token"), "POST", { ...payload }).then((res) => {
      console.log(res);
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
    } else {
      if (selectedTasks) {
        setSelectedTasks([...selectedTasks, task]);
      } else {
        setSelectedTasks([task]);
      }
    }
  }

  return (
    <div className={styles.Box} component="form" noValidate sx={{ mt: 1 }}>
      <div className={styles.SprintInput}>
        <label className={styles.SprintLabel} htmlFor="TaskAssignees">
          Invoice Title
        </label>
        <input placeholder="UI Revamp" value={invoiceTitle} onChange={(e) => setInvoiceTitle(e.target.value)} className={styles.SprintTitleInput} type="text" />
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
      {selectedClient ? (
        <TaskTable
          hasTimer={false}
          hasClient={false}
          searchDisabled={true}
          presetSearchTerm={selectedClient.client_name}
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
      <button onClick={() => createInvoice()} disabled={isDisabled} className={styles.CreateButton}>
        Create Invoice
      </button>
    </div>
  );
}
