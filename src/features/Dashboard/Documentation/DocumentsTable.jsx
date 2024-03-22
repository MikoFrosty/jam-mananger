import styles from "../../../css/Documentation/DocumentationTable.module.css";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  deleteDocument,
  fetchClientDocuments,
  fetchDocuments,
  setEditingDocument,
  toggleView,
} from "../../../StateManagement/Actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DocumentTable({ type, searchTerm }) {
  const clientUser = useSelector((state) => state.app.client_user);
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.app.documents);
  const [rows, setRows] = useState(null);

  useEffect(() => {
    console.log(type)
    if (type && type === "client" && clientUser) {
      dispatch(fetchClientDocuments());
    } else {
      dispatch(fetchDocuments());
    }
  }, [type, clientUser]);

  useEffect(() => {
    if (documents.length > 0) {
      // Filter rows based on the searchTerm
      const tempRows = documents
        .filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.folder?.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            item.client?.client_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            item.contributors.some((contributor) =>
              contributor.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .map((item) => ({
          document_id: item.document_id,
          is_public: item.is_public,
          title: item.title,
          client: item.client || {},
          folder: item.folder || {},
          folder_name: item.folder?.name,
          client_name: item.document_client?.client_name,
          contributors: item.contributors,
          joined_contributors: item.contributors.length,
        }));
      
        setRows(tempRows)
    }
  }, [documents]);

  function handleDocCreate() {
    dispatch(toggleView("documentation-create"));
  }

  function handleDocDelete(document_id, e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteDocument(document_id));
  }

  function notify(message) {
    toast(message, {
      className: styles.SmallToast,
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
  }

  function handleDocEdit(document_id) {
    dispatch(setEditingDocument(document_id));
    dispatch(toggleView("documentation-edit"));
  }

  function handleDocURLCopy(e, doc_id) {
    // http://localhost:5173/public-docs?doc_id=${doc_id}
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard
      .writeText(`https://kamariteams.com/public-docs?doc_id=${doc_id}`)
      .then(() => {
        notify("Copied to Clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy document ID to clipboard: ", err);
        // Optionally, show an error message to the user.
      });
  }

  return (
    <div className={styles.TableView}>
      {!rows ? (
        <Skeleton height="100%" width="100%" />
      ) : (
        <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ py: 2 }}>
              <TableRow>
                <TableCell sx={{ py: 1, px: 1 }} padding="none"></TableCell>
                <TableCell sx={{ py: 1, px: 1 }} padding="none">
                  Title
                </TableCell>
                <TableCell sx={{ py: 1, px: 1 }} padding="none" align="right">
                  Folder
                </TableCell>
                <TableCell sx={{ py: 1, px: 1 }} padding="none" align="right">
                  Client
                </TableCell>
                <TableCell sx={{ py: 1, px: 1 }} padding="none" align="right">
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
                  {type === "user" ? (
                    <button
                      onClick={handleDocCreate}
                      className={styles.CreateButton}
                    >
                      Create Doc
                    </button>
                  ) : (
                    <div style={{ height: "35px" }}></div>
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={`document_${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className={styles.Row}
                  onClick={() => handleDocEdit(row)}
                >
                  <TableCell padding="none" sx={{ py: 1, px: 1 }} align="right">
                    {row.is_public ? (
                      <ContentCopyIcon
                        className={styles.Icon}
                        onClick={(e) => handleDocURLCopy(e, row.document_id)}
                      />
                    ) : null}
                  </TableCell>
                  <TableCell
                    padding="none"
                    sx={{ py: 1, px: 1 }}
                    component="th"
                    scope="row"
                  >
                    {row.title}
                  </TableCell>
                  <TableCell padding="none" sx={{ py: 1, px: 1 }} align="right">
                    {row.folder_name}
                  </TableCell>
                  <TableCell padding="none" sx={{ py: 1, px: 1 }} align="right">
                    <Box display="flex" justifyContent="flex-end">
                      {row.client_name ? (
                        <Typography
                          sx={{
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor: "rgba(46, 196, 182, 0.3)",
                          }}
                          variant="body1"
                        >
                          {row.client_name}
                        </Typography>
                      ) : null}
                    </Box>
                  </TableCell>
                  <TableCell padding="none" sx={{ py: 1, px: 1 }} align="right">
                    {row.joined_contributors}
                  </TableCell>
                  <TableCell padding="none" sx={{ py: 1, px: 1 }} align="right">
                    <DeleteForeverIcon
                      className={styles.Icon}
                      onClick={(e) => handleDocDelete(row.document_id, e)}
                      fontSize={"medium"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}
