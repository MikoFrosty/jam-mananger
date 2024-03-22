import { useEffect, useState } from "react";
import styles from "../../css/Invoices/Invoice.module.css";
import AccountBar from "../Account/AccountBar";
import FixedButton from "../Buttons/FloatingAction";
import SlidingModal from "../Dashboard/SlidingModal";
import InvoiceCreate from "./CreateInvoiceForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchClients,
  fetchProjects,
  fetchUserInvoices,
  getOrganization,
} from "../../StateManagement/Actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HoverDropdown from "../../components/HoverDropdown";

import Typography from "@mui/material/Typography";

export default function Invoice({ type = "user" }) {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.app.clients);
  const invoices = useSelector((state) => state.app.invoices);
  const projects = useSelector((state) => state.app.projects);
  const organization = useSelector((state) => state.app.organization);
  const tasks = useSelector((state) => state.app.memberTasks);
  const [view, setView] = useState("Invoices");
  const [createInvoice, setCreateInvoice] = useState(false);
  const [clientsFetched, setClientsFetched] = useState(false);
  const [filteredClients, setFilteredClients] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [refetchProjects, setRefetchProjects] = useState(false);
  const [myInvoices, setMyInvoices] = useState(null);

  useEffect(() => {
    if (!projects || refetchProjects) {
      dispatch(fetchProjects());
      setRefetchProjects(false);
    }
  }, [projects, refetchProjects]);

  useEffect(() => {
    if (clients) {
      setFilteredClients(clients);
    } else if (type === "user") {
      dispatch(fetchClients());
    }

    if (!projects) {
      dispatch(fetchProjects());
    } else {
      console.log("Projects", projects);
    }

    if (!organization) {
      dispatch(getOrganization());
    } else {
      console.log(organization)
    }
  }, [clients, projects, organization]);



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
    if (selectedClient && projects) {
      const theseProjects = projects.filter(
        (project) => project.client.client_id === selectedClient.client_id
      );

      setFilteredProjects(theseProjects);
    }
  }, [selectedClient, projects]);

  useEffect(() => {}, [filteredClients, filteredProjects]);

  useEffect(() => {
    if (!invoices) {
      dispatch(fetchUserInvoices());
    } else {
      console.log(invoices);
    }
  }, [invoices]);

  useEffect(() => {
    if (!clients) {
      dispatch(fetchClients());
    }
    setClientsFetched(true);
  }, [clients]);

  function handleViewToggle(view) {
    setView(view);
  }

  function handleInvoiceCreate() {
    if (clients.length === 0 && clientsFetched) {
      notify("To create an invoice, add a client");
    } else {
      toggleInvoiceCreateModal();
    }
  }

  function toggleInvoiceCreateModal() {
    setCreateInvoice(!createInvoice);
  }

  function notify(message) {
    toast(message, {
      className: styles.SmallToast,
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
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

  return (
    <div className={styles.Invoices}>
      <AccountBar
        view={view}
        onViewToggle={handleViewToggle}
        toggle={false}
        toggleOptions={["Invoices"]}
        label={"Invoices"}
      >
        {filteredClients && filteredClients.length > 0 && type === "user" ? (
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
        ) : null}
        {filteredProjects && filteredProjects.length > 0 ? (
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
                          // filteredProjects.some(
                          //   (c) => c.project_id === selectedProject?.project_id
                          // )
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
      </AccountBar>
      <div className={styles.InvoicesMain}>
        <div className={styles.ExistingInvoices}>
          
        </div>
      </div>
      {createInvoice ? (
        <SlidingModal
          isOpen={createInvoice}
          toggleModal={toggleInvoiceCreateModal}
        >
          <InvoiceCreate
            toggleModal={toggleInvoiceCreateModal}
            isOpen={createInvoice}
            type={"user"}
          />
        </SlidingModal>
      ) : null}
      {!createInvoice ? (
        <FixedButton
          label={"Create Invoice"}
          handleClick={handleInvoiceCreate}
        />
      ) : null}
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}
