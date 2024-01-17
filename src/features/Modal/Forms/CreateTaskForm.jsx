import styles from "../../../css/Forms.module.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DocumentCreator from "../../DocumentComponents/DocumentCreator";

export default function CreateTaskForm({ isOpen }) {
  async function handleSubmit() {
    await console.log("YES");
  }

  return (
    <div onSubmit={handleSubmit} className={styles.FormContainer}>
      <div className={styles.FormLeft}>
        {/* <Typography variant="h4">Create Task</Typography> */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="taskTitle"
          label="Title"
          name="taskTitle"
          focused
        />
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
}
