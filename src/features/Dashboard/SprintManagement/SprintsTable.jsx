import styles from "../../../css/Documentation/DocumentationTable.module.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography"

export default function SprintTable({ searchTerm, handleSprintSelect }) {
  const sprints = useSelector((state) => state.app.sprints);
  const team = useSelector((state) => state.app.team);
  console.log(sprints[0]);
  let seenMembers = [];
  const rows =
    sprints
      .filter(
        (sprint) =>
          sprint.status !== "Active" && sprint.title.includes(searchTerm)
      )
      .map((sprint) => {
        const seenMembers = new Set(); // Use a Set for efficient lookups
        const memberImages =
          sprint.members?.reduce((acc, member) => {
            // Check if we've already processed this member
            if (!seenMembers.has(member.email)) {
              seenMembers.add(member.email); // Mark this member as seen
              // Assuming 'team' is an array of member objects including the profile_image_url
              const memberObj = team.find((m) => m.email === member.email);
              // Push the member's profile image URL or an empty string if not found
              acc.push(memberObj?.profile_image_url || "no url");
            }
            return acc;
          }, []) || [];

        return {
          sprint: sprint,
          sprint_id: sprint.sprint_id,
          title: sprint.title,
          status: sprint.status,
          tasks: sprint.tasks?.length,
          members: sprint.members?.map((member) => member.email).join(", "),
          memberImages, // This now holds an array of profile image URLs or empty strings
        };
      }) || [];

  console.log(rows);
  console.log(sprints);

  return (
    <div className={styles.TableView}>
      <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
        <Table
          sx={{ minWidth: 650, overflowY: "scroll" }}
          aria-label="simple table"
        >
          <TableHead sx={{ py: 2 }}>
            <TableRow>
              <TableCell
                sx={{ py: 1, padding: "8px 5px 8px 16px" }}
                padding="none"
              >
                Title
              </TableCell>
              <TableCell
                sx={{ py: 1, padding: "8px 16px 8px 5px" }}
                padding="none"
                align="left"
              >
                Status
              </TableCell>
              <TableCell
                sx={{ py: 1, padding: "8px 16px 8px 5px" }}
                padding="none"
                align="right"
              >
                Tasks
              </TableCell>
              <TableCell
                sx={{ py: 1, padding: "8px 16px 8px 5px" }}
                padding="none"
                align="right"
              >
                Contributors
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={styles.Row}
                onClick={() => handleSprintSelect(row.sprint)}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell sx={{padding: "8px 16px 8px 5px"}} align="right">
                  {
                    <Typography sx={{alignSelf: "end"}} className={styles.StatusText}>
                      {row.status}
                    </Typography>
                  }
                </TableCell>
                <TableCell align="right">{row.tasks}</TableCell>
                {row.memberImages.length < 4 ? (
                  <TableCell className={styles.RowCell} align="right">
                    {row.memberImages.map((imageUrl, index) => {
                      if (imageUrl === "no url") {
                        return (
                          <AccountCircleIcon className={styles.MemberImage} />
                        );
                      } else {
                        return (
                          <img
                            className={styles.MemberImage}
                            src={imageUrl}
                            alt="Team Member Photo"
                          />
                        );
                      }
                    })}
                  </TableCell>
                ) : (
                  <TableCell className={styles.RowCell} align="right">
                    {row.memberImages.map((imageUrl, index) => {
                      if (index < 2) {
                        if (imageUrl === "no url") {
                          return (
                            <AccountCircleIcon className={styles.MemberImage} />
                          );
                        } else {
                          return (
                            <img
                              className={styles.MemberImage}
                              src={imageUrl}
                              alt="Team Member Photo"
                            />
                          );
                        }
                      }
                    })}{" "}
                    + {memberUrls.length - 3} More
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
