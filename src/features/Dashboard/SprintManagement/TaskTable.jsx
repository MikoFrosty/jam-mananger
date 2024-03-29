import React, { useState, useEffect } from "react";
import styles from "../../../css/SprintManagement/TaskTable.module.css";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import Timer from "../../../components/inputs/Timer";
import TableSearch from "../../../components/searchbar/TableSearch";
import Checkbox from "@mui/material/Checkbox";
import { fetchTasks } from "../../../StateManagement/Actions/actions";

const TaskTable = ({
  type = "user",
  searchDisabled = false,
  presetSearchTerm = "",
  hasClient = true,
  hasTimer = true,
  handleTaskSelect,
  selectedTasks = null,
}) => {
  const dispatch = useDispatch();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(presetSearchTerm);
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [currentTasks, setCurrentTasks] = useState(null);
  const tasks = useSelector((state) => state.app.memberTasks);
  const itemsPerPage = 15;

  useEffect(() => {
    if (presetSearchTerm !== "") {
      setSearchTerm(presetSearchTerm)
    }
  }, [presetSearchTerm])

  useEffect(() => {
    // Calculate the start and end indexes for the current page
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    setStartIndex(start);
    setEndIndex(end);
  }, [currentPage]);

  useEffect(() => {
    if (!tasks) {
      dispatch(fetchTasks());
    } else if (startIndex >= 0 && endIndex) {
      console.log("tasks found");
      let parsed_search_term = searchTerm.split(" ");
      const these_tasks = tasks.filter((task) => {
        const { title, client, status } = task;

        // Iterate over each search term and test against multiple fields
        const isMatch = parsed_search_term.every(term => {
          const searchRegex = new RegExp(term, "i");
          return (
            searchRegex.test(title) ||
            searchRegex.test(client?.client_name || "") ||
            searchRegex.test(status.status_title)
          );
        });

        return isMatch;
      });
      console.log(these_tasks);

      setFilteredTasks(these_tasks);
      setCurrentTasks(these_tasks?.slice(startIndex, endIndex));
    }
  }, [tasks, startIndex, endIndex, searchTerm]);


  useEffect(() => {
    if (filteredTasks) {
      console.log("Filtered Tasks", filteredTasks);
    }
  }, [filteredTasks]);

  useEffect(() => {
    if (currentTasks) {
      console.log(currentTasks);
    }
  }, [currentTasks]);

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
      {filteredTasks?.length > 0 ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                {hasClient ? <th>Client</th> : null}
                {!searchDisabled ? (
                  <th style={{ width: "fit-content" }}>
                    <TableSearch
                      label={"Search Tasks..."}
                      onSearch={handleSearch}
                    />
                  </th>
                ) : !hasTimer ? (
                  <th>Billable Hours</th>
                ) : null}
                {!hasTimer ? <th></th> : null}
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task, index) => (
                <tr
                  onClick={() => handleTaskSelect(task)}
                  key={index}
                  className={styles.row}
                >
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
                  {hasClient ? <td>{task.client?.client_name}</td> : null}
                  {hasTimer ? (
                    <td>{<Timer task={task} />}</td>
                  ) : (
                    <td>
                      <Typography
                        variant="body1"
                        color={"#333"}
                        backgroundColor={"rgba(46, 196, 182, 0.3)"}
                        padding={"8px"}
                        width={"80px"}
                        textAlign={"center"}
                        borderRadius={"5px"}
                      >
                        {task.billed_duration
                          ? (
                              (task.duration - task.billed_duration) /
                              (60 * 60 * 1000)
                            ).toFixed(2)
                          : (task.duration / (60 * 60 * 1000)).toFixed(2)}
                      </Typography>
                    </td>
                  )}
                  {!hasTimer ? (
                    <td style={{ textAlign: "right" }}>
                      <Checkbox
                        checked={
                          selectedTasks
                            ? selectedTasks.some(
                                (selected_task) =>
                                  selected_task.task_id === task.task_id
                              )
                            : false
                        }
                      />
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            {Array.from(
              { length: Math.ceil(tasks?.length / itemsPerPage) },
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
        </>
      ) : filteredTasks?.length === 0 && searchTerm ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th></th>
                <th></th>
                <th></th>
                {!searchDisabled ? (
                  <th style={{ width: "fit-content" }}>
                    <TableSearch
                      label={"Search Tasks..."}
                      onSearch={handleSearch}
                    />
                  </th>
                ) : (
                  <th></th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No Tasks Found</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className={styles.pagination}>
            {Array.from(
              { length: Math.ceil(tasks?.length / itemsPerPage) },
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
        </>
      ) : (
        <Typography marginLeft={"5px"} textAlign={"left"} variant="body2">
          No Tasks Found
        </Typography>
      )}
    </div>
  );
};

export default TaskTable;
