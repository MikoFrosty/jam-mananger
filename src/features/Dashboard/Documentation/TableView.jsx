import styles from "../../../css/Documentation/DocumentationTable.module.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SettingsIcon from '@mui/icons-material/Settings';
import ToggleButton from '@mui/material/ToggleButton';

function createData(title, project, sprint, contributors, protein) {
  return { title, project, sprint, contributors, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function TableView({ data }) {
  console.log(data)
  return (
    <div className={styles.TableView}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Project</TableCell>
              <TableCell align="right">Sprint</TableCell>
              <TableCell align="right">Contributors</TableCell>
              <TableCell align="right">Client</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right"><ToggleButton size={"small"}/></TableCell>
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell align="right">{row.project}</TableCell>
                <TableCell align="right">{row.sprint}</TableCell>
                <TableCell align="right">{row.sprint}</TableCell>
                <TableCell align="right">{row.contributors}</TableCell>
                <TableCell align="right"><SettingsIcon fontSize={"small"}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
