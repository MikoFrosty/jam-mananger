import React, { useEffect, useState } from "react";
import styles from "../../../css/SprintManagement/TaskTable.module.css";
import { useSelector } from "react-redux";

import FixedButton from "../../Buttons/FloatingAction";

import Typography from "@mui/material/Typography";
import Timer from "../../../components/inputs/Timer";
import TableSearch from "../../../components/searchbar/TableSearch";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../../../StateManagement/Actions/actions";

import SlidingModal from "../SlidingModal";
import ProjectCreate from "./ProjectCreate";

const ProjectsTable = ({ type = "user" }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [createProject, setCreateProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [refetchProjects, setRefetchProjects] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const projects = useSelector((state) => state.app.projects);
  const itemsPerPage = 15;

  useEffect(() => {
    if (!projects || refetchProjects) {
      dispatch(fetchProjects());
      setRefetchProjects(false);
    } else {
      const theseFilteredProjects =
        projects?.filter((task) => {
          const { title, client, status } = task;
          const searchRegex = new RegExp(searchTerm, "i");
          return (
            searchRegex.test(title) ||
            searchRegex.test(client?.client_name || "") ||
            searchRegex.test(status.status_title)
          );
        }) || [];

      setFilteredProjects(theseFilteredProjects);
    }
  }, [projects, refetchProjects, searchTerm]);

  useEffect(() => {
    if (selectedProject) {
      setCreateProject(true);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (!createProject) {
      setSelectedProject(null);
    }
  }, [createProject]);

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page after a new search
  };

  function toggleProjectCreateModal() {
    console.log("Create Project", createProject);
    if (createProject) {
      setCreateProject(false);
      setSelectedProject(null);
    } else {
      setCreateProject(true);
    }

    setRefetchProjects(true);
  }

  function handleProjectCreateToggleWithExisting(project) {
    setSelectedProject(project);
    console.log(project);
  }

  return !projects || projects.length === 0 ? (
    <div>
      <button
        onClick={toggleProjectCreateModal}
        className={styles.EmptyListButton}
      >
        Create Project
      </button>
      {createProject ? (
        <SlidingModal
          isOpen={createProject}
          toggleModal={toggleProjectCreateModal}
        >
          <ProjectCreate
            toggleModal={toggleProjectCreateModal}
            isOpen={createProject}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            type={type}
          />
        </SlidingModal>
      ) : null}
    </div>
  ) : (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Org</th>
            <th style={{ width: "fit-content" }}>
              <TableSearch
                label={"Search Projects..."}
                onSearch={handleSearch}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project, index) => (
            <tr
              onClick={() => handleProjectCreateToggleWithExisting(project)}
              key={index}
              className={styles.row}
            >
              <td className={styles.taskCell}>{project.title}</td>
              <td>
                <Typography
                  variant="body1"
                  color={project.status.color}
                  backgroundColor={project.status.softerColor}
                  padding={"8px"}
                  width={"fit-content"}
                  textAlign={"center"}
                  borderRadius={"5px"}
                >
                  {project.status.title}
                </Typography>
              </td>
              <td>${project.cost}</td>
              <td>{project.organization?.name}</td>
              <td style={{ textAlign: "right" }}>${project.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(projects?.length / itemsPerPage) },
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
      {!createProject ? (
        <FixedButton
          handleClick={toggleProjectCreateModal}
          verticalOffset={"70px"}
          label={"Create Project"}
        />
      ) : (
        <SlidingModal
          isOpen={createProject}
          toggleModal={toggleProjectCreateModal}
        >
          <ProjectCreate
            toggleModal={toggleProjectCreateModal}
            isOpen={createProject}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            type={type}
          />
        </SlidingModal>
      )}
    </div>
  );
};

export default ProjectsTable;
