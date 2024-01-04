import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function KamariList({ items }) {
  console.log(items);

  return (
    <Box sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          {items.map((item, index) => {
            return (
              <ListItem key={`alert_${index}`} disablePadding>
                <ListItemButton component="a" href={"alert-task-id"}>
                  <ListItemText
                    primary={item.created_by.name}
                    secondary={item.text}
                  />
                </ListItemButton>
                <FiberManualRecordIcon
                  fontSize={"small"}
                  style={{
                    color:
                      item.escalation === "Low"
                        ? "#11d99b"
                        : item.escalation === "Medium"
                        ? "#fe6601"
                        : "#ff6c6c",
                  }}
                />
                {index !== items.length - 1 ? <Divider /> : null}
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}
