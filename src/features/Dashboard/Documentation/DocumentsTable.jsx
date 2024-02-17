import styles from "../../../css/Documentation/DocumentationTable.module.css";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  deleteDocument,
  fetchDocuments,
  setEditingDocument,
  toggleView,
} from "../../../StateManagement/Actions/actions";
import { useSelector, useDispatch } from "react-redux";

export default function DocumentTable({ searchTerm }) {
  const dispatch = useDispatch();

  const documents = useSelector((state) => state.app.documents) || [];

  console.log(documents);

  // Filter rows based on the searchTerm
  const rows = documents
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.folder?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client?.client_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.contributors.some((contributor) =>
          contributor.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .map((item) => ({
      document_id: item.document_id,
      content: item.content,
      updates: item.updates,
      title: item.title,
      client: item.client || {},
      folder: item.folder || {},
      folder_name: item.folder?.name,
      client_name: item.client?.client_name,
      contributors: item.contributors,
      joined_contributors: item.contributors.length,
      document: item,
    }));

  function handleDocCreate() {
    dispatch(toggleView("documentation-create"));
  }

  function handleDocDelete(document, e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteDocument(document));
  }

  function notify(message) {
    toast(message, {
      className: styles.SmallToast,
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
  }

  function handleDocEdit(document) {
    dispatch(setEditingDocument(document.document));
    dispatch(toggleView("documentation-edit"));
  }

  function handleDocURLCopy(e, doc_id) {
    // https://kamariteams.com/public_docs?doc_id=${doc_id}
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard
      .writeText(`http://localhost:5173/public-docs?doc_id=${doc_id}`)
      .then(() => {
        console.log("Document ID copied to clipboard successfully!");
        // Optionally, show a success message to the user.
        notify("Copied to Clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy document ID to clipboard: ", err);
        // Optionally, show an error message to the user.
      });
  }

  return (
    <div className={styles.TableView}>
      <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ py: 2 }}>
            <TableRow>
              <TableCell sx={{ py: 1 }} padding="none"></TableCell>
              <TableCell sx={{ py: 1 }} padding="none">
                Title
              </TableCell>
              <TableCell sx={{ py: 1 }} padding="none" align="right">
                Folder
              </TableCell>
              <TableCell sx={{ py: 1 }} padding="none" align="right">
                Client
              </TableCell>
              <TableCell sx={{ py: 1 }} padding="none" align="right">
                Contributors
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
                <button
                  onClick={handleDocCreate}
                  className={styles.CreateButton}
                >
                  Create Doc
                </button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={`${row.title}_${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={styles.Row}
                onClick={() => handleDocEdit(row)}
              >
                <TableCell align="right">
                  {row.document.is_public ? (
                    <ContentCopyIcon
                      className={styles.Icon}
                      onClick={(e) =>
                        handleDocURLCopy(e, row.document.document_id)
                      }
                    />
                  ) : null}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.folder_name}</TableCell>
                <TableCell align="right">{row.client_name}</TableCell>
                <TableCell align="right">{row.joined_contributors}</TableCell>
                <TableCell align="right">
                  <DeleteForeverIcon
                    className={styles.Icon}
                    onClick={(e) => handleDocDelete(row, e)}
                    fontSize={"small"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}
