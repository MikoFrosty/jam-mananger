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

// move conditional rendering of dropdown to condintionally render the dropdown content

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import HoverDropdown from "../../components/HoverDropdown";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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
  const [filteredInvoices, setFilteredInvoices] = useState(null);
  const [refetchInvoices, setRefetchInvoices] = useState(false);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const [quantityApplied, setQuantityApplied] = useState(false);

  // optimistically add an invoice

  useEffect(() => {
    if (!projects || refetchProjects) {
      dispatch(fetchProjects());
      setRefetchProjects(false);
    }
  }, [projects, refetchProjects]);

  useEffect(() => {
    if (invoices && organization) {
      for (let invoice of invoices) {
        if (invoice.customer === organization.billing.customer) {
          console.log(invoice.customer);
          console.log(organization.billing.customer);
        }
      }
    }
  }, [invoices, organization]);

  useEffect(() => {
    if (clients) {
      setFilteredClients(clients);
    } else if (type === "user") {
      dispatch(fetchClients());
    }

    // did not add this
    if (!projects) {
      dispatch(fetchProjects());
    } else {
      console.log("Projects", projects);
    }

    if (!organization) {
      dispatch(getOrganization());
    } else {
      console.log(organization);
    }
  }, [clients, projects, organization]);

  useEffect(() => {
    if (invoices && organization) {
      let these_invoices = invoices
        .filter(
          (invoice) =>
            invoice.customer !== organization.billing.customer &&
            invoice.billing_reason === "manual"
        )
        .filter((invoice) => invoice)
        .map((invoice) => {
          let totalQuantity = 0;

          invoice.lines.data.forEach((lineItem) => {
            // Check if the line item is for eggs (you need to define how you mark eggs in your line items)
            if (lineItem.description === "Eggs") {
              // Increment total quantity by the quantity of eggs sold in this line item
              totalQuantity += lineItem.quantity;
            }
          });

          return {
            ...invoice,
            total_quantity: totalQuantity,
          };
        });
      setFilteredInvoices(these_invoices);
      setInvoicesLoading(false);
    }
  }, [invoices, organization]);

  useEffect(() => {
    if (filteredInvoices) {
      console.log(filteredInvoices);
    }
  }, [filteredInvoices]);

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
      let these_invoices = invoices
        .filter(
          (invoice) =>
            invoice.customer !== organization.billing.customer &&
            invoice.billing_reason === "manual" &&
            invoice.metadata.client &&
            JSON.parse(invoice.metadata.client).client_id ===
              selectedClient.client_id
        )
        .filter((invoice) => invoice)
        .map((invoice) => {
          let totalQuantity = 0;

          invoice.lines.data.forEach((lineItem) => {
            // Check if the line item is for eggs (you need to define how you mark eggs in your line items)
            if (lineItem.description === "Eggs") {
              // Increment total quantity by the quantity of eggs sold in this line item
              totalQuantity += lineItem.quantity;
            }
          });

          return {
            ...invoice,
            total_quantity: totalQuantity,
          };
        });
      setFilteredProjects(theseProjects);
      setFilteredInvoices(these_invoices);
    } else if (!selectedClient && projects && invoices) {
      setFilteredProjects(projects);
      let these_invoices = invoices
        .filter(
          (invoice) =>
            invoice.customer !== organization.billing.customer &&
            invoice.billing_reason === "manual"
        )
        .filter((invoice) => invoice)
        .map((invoice) => {
          let totalQuantity = 0;

          invoice.lines.data.forEach((lineItem) => {
            // Check if the line item is for eggs (you need to define how you mark eggs in your line items)
            if (lineItem.description === "Eggs") {
              // Increment total quantity by the quantity of eggs sold in this line item
              totalQuantity += lineItem.quantity;
            }
          });

          return {
            ...invoice,
            total_quantity: totalQuantity,
          };
        });

      setFilteredInvoices(these_invoices);
    } else if (!selectedClient && !projects && invoices) {
      let these_invoices = invoices
        .filter(
          (invoice) =>
            invoice.customer !== organization.billing.customer &&
            invoice.billing_reason === "manual"
        )
        .filter((invoice) => invoice)
        .map((invoice) => {
          let totalQuantity = 0;

          invoice.lines.data.forEach((lineItem) => {
            // Check if the line item is for eggs (you need to define how you mark eggs in your line items)
            if (lineItem.description === "Eggs") {
              // Increment total quantity by the quantity of eggs sold in this line item
              totalQuantity += lineItem.quantity;
            }
          });

          return {
            ...invoice,
            total_quantity: totalQuantity,
          };
        });

      setFilteredInvoices(these_invoices);
    }
  }, [selectedClient, projects, invoices]);

  useEffect(() => {}, [filteredClients, filteredProjects]);

  useEffect(() => {
    if (refetchInvoices) {
      setInvoicesLoading(true);
      dispatch(fetchUserInvoices());
      setQuantityApplied(false);
      setRefetchInvoices(false);
    }
  }, [refetchInvoices]);

  useEffect(() => {
    if (!invoices) {
      setRefetchInvoices(true);
    } else {
      setRefetchInvoices(false);
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
    if (clients?.length === 0 && clientsFetched) {
      notify("To create an invoice, add a client");
    } else {
      toggleInvoiceCreateModal();
    }
  }

  function toggleInvoiceCreateModal() {
    setCreateInvoice(!createInvoice);
    setRefetchInvoices(createInvoice);
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

  function handleNavigate(destination) {
    if (destination) {
      window.open(destination);
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
        {filteredClients && filteredClients?.length > 0 && type === "user" ? (
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
                  filteredClients?.map((client, index) => {
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
      </AccountBar>
      <div className={styles.InvoicesMain}>
        <div className={styles.ExistingInvoices}>
          {filteredInvoices && !invoicesLoading ? (
            filteredInvoices.map((invoice) => {
              return (
                <div
                  key={`invoice_${invoice.id}`}
                  className={styles.ExistingInvoice}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      height: "fit-content",
                      rowGap: "10px",
                    }}
                  >
                    <div className={styles.InputRow}>
                      {invoice.hosted_invoice_url ? (
                        <OpenInNewIcon
                          style={{ fontSize: "large" }}
                          onClick={() =>
                            handleNavigate(invoice.hosted_invoice_url)
                          }
                          className={styles.Icon}
                        />
                      ) : null}
                      {invoice.metadata.title ? (
                        <Typography
                          style={{ textDecoration: "underline" }}
                          variant="body1"
                        >
                          {invoice.metadata.title}
                        </Typography>
                      ) : null}
                    </div>
                    <div className={styles.InfoRow}>
                      <div className={styles.InvoiceInput}>
                        <label className={styles.InvoiceLabel}>
                          Hours Billed
                        </label>
                        <Typography
                          className={styles.InvoiceInfoText}
                          variant="body2"
                        >
                          {invoice.total_quantity}
                        </Typography>
                      </div>
                      <div className={styles.InvoiceInput}>
                        <label className={styles.InvoiceLabel}>
                          Tasks Billed
                        </label>
                        <Typography
                          className={styles.InvoiceInfoText}
                          variant="body2"
                        >
                          {invoice.lines.data?.length || 0}
                        </Typography>
                      </div>
                      <div className={styles.InvoiceInput}>
                        <label className={styles.InvoiceLabel}>Status</label>
                        <Typography
                          style={
                            invoice.status === "paid"
                              ? {
                                  backgroundColor: "rgba(46, 196, 182, 0.3)",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }
                              : {}
                          }
                          variant="caption"
                        >{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className={styles.InvoiceInput}>
                    <label className={styles.InvoiceLabel}>Total Billed</label>
                    <div className={styles.MainContent}>
                      <Typography textOverflow={'ellipsis'} variant="h2">
                      $ {(((invoice.total / 100) > 1000) ? `${((invoice.total)/(100 * 1000)).toFixed(1)} k` : `${((invoice.total)/100).toFixed(2)}`)}
                      </Typography>
                    </div>
                  </div>
                  <div className={styles.InputRow}>
                    {invoice.invoice_pdf ? (
                      <button
                        onClick={() => handleNavigate(invoice.invoice_pdf)}
                        className={styles.DownloadInvoiceButton}
                      >
                        Download Invoice
                      </button>
                    ) : null}
                    {invoice.metadata.client ? (
                      <Typography
                        className={styles.SpecialText}
                        variant="body2"
                      >
                        {JSON.parse(invoice.metadata.client).client_name}
                      </Typography>
                    ) : null}
                  </div>
                </div>
              );
            })
          ) : filteredInvoices && !invoicesLoading ? (
            <Typography variant="body1">No Invoices Found</Typography>
          ) : (
            <>
              <div style={{ height: "300px", width: "250px" }}>
                <Skeleton width={"100%"} height={"100%"} />
              </div>
              <div style={{ height: "300px", width: "250px" }}>
                <Skeleton width={"100%"} height={"100%"} />
              </div>
              <div style={{ height: "300px", width: "250px" }}>
                <Skeleton width={"100%"} height={"100%"} />
              </div>
              <div style={{ height: "300px", width: "250px" }}>
                <Skeleton width={"100%"} height={"100%"} />
              </div>
            </>
          )}
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
