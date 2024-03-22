import React, { useState } from "react";
import styles from "../../../css/SprintManagement/TaskTable.module.css";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import Timer from "../../../components/inputs/Timer";
import TableSearch from "../../../components/searchbar/TableSearch";

const TaskTable = ({ type = "user" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const invoices = useSelector((state) => state.app.invoices);
  const itemsPerPage = 15;

  // Filter tasks based on search term
  const filteredInvoices = invoices.filter((invoice) => {
    const { customer_name, customer_email } = invoice;
    const searchRegex = new RegExp(searchTerm, "i");
    return (
      searchRegex.test(customer_email) ||
      searchRegex.test(customer_name)
    );
  });

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page after a new search
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Client</th>
            <th>Status</th>
            <th>Total</th>
            <th>Hours</th>
            <th>Tasks</th>
            <th style={{ width: "fit-content" }}>
              <TableSearch label={"Search Tasks..."} onSearch={handleSearch}/>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.taskCell}>{task.title}</td>
              <td>
                <Typography
                  variant="body1"
                  color={task.escalation.color}
                  backgroundColor={task.escalation.softerColor}
                  padding={"8px"}
                  width={"80px"}
                  textAlign={"center"}
                  borderRadius={"5px"}
                >
                  {task.escalation.title}
                </Typography>
              </td>
              <td>{task.status.status_title}</td>
              <td>{task.client?.client_name}</td>
              <td>{<Timer />}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(tasks.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? styles.activePage : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TaskTable;
