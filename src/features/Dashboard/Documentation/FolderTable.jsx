import styles from "../../../css/Documentation/DocumentationTable.module.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SettingsIcon from "@mui/icons-material/Settings";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteFolder,
  fetchFolders,
} from "../../../StateManagement/Actions/actions";

export default function FolderTable({ searchTerm, toggleModal }) {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.app.folders);
  const rows =
    folders &&
    folders
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.project?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sprints
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.contributors?.some((contributor) =>
            contributor.email.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          item.client?.client_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.documents
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
      .map((item) => ({
        folder_id: item.folder_id,
        title: item.name,
        project: item.project,
        sprint: item.sprints,
        contributors: item.contributors
          ?.map((contributor) => contributor.email)
          .join(", "),
        documents: item.documents?.length,
        client: item.client?.client_name,
      }));

      function handleDeleteFolder(folder, e) {
        e.preventDefault();
        e.stopPropagation(); // Corrected the spelling here
        dispatch(deleteFolder(folder));
      }

  return (
    <div className={styles.TableView}>
      <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
        <Table
          sx={{ minWidth: 650, overflowY: "scroll" }}
          aria-label="simple table"
        >
          <TableHead sx={{ py: 2 }}>
            <TableRow>
              <TableCell sx={{ py: 1 }} padding="none"></TableCell>
              <TableCell sx={{ py: 1 }} padding="none">
                Title
              </TableCell>
              <TableCell sx={{ py: 1 }} padding="none" align="right">
                Project
              </TableCell>
              <TableCell sx={{ py: 1 }} padding="none" align="right">
                Sprint
              </TableCell>
              <TableCell sx={{ py: 1 }} padding="none" align="right">
                Contributors
              </TableCell>
              <TableCell sx={{ py: 1 }} padding="none" align="right">
                Documents
              </TableCell>
              <TableCell sx={{ py: 1 }} padding="none" align="right">
                Client
              </TableCell>
              <TableCell
                padding="none"
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "end",
                  py: 1,
                }}
              >
                <button onClick={toggleModal} className={styles.CreateButton}>
                  Create Folder
                </button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={styles.Row}
              >
                <TableCell align="right">
                  <ToggleButton value={false} size={"small"} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.project}</TableCell>
                <TableCell align="right">{row.sprint}</TableCell>
                <TableCell align="right">{row.contributors}</TableCell>
                <TableCell align="right">{row.documents}</TableCell>
                <TableCell align="right">{row.client}</TableCell>
                <TableCell align="right">
                  <SettingsIcon
                    className={styles.Icon}
                    onClick={(e) => handleDeleteFolder(row, e)}
                    fontSize={"small"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
