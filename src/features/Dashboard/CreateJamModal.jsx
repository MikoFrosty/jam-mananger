import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import BasicDatePicker from "../../components/DatePicker";
import convert from "../../utils/dates/convertDates";

CreateJamModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  createJamModalOpen: PropTypes.bool.isRequired,
  setCreateJamModalOpen: PropTypes.func.isRequired,
};

export default function CreateJamModal({
  onSave,
  createJamModalOpen,
  setCreateJamModalOpen,
}) {
  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [jamUrl, setJamUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // set starting date to tomorrow by default
  const [startTime, setStartTime] = useState(
    `${Date.now() + 24 * 60 * 60 * 1000}`
  );

  const handleSave = (e) => {
    e.preventDefault();

    const newJam = {
      title,
      time_limit: timeLimit,
      jam_url: jamUrl,
      image_url: imageUrl,
      start_time: startTime,
    };
    onSave(newJam);
  };

  const handleDateSelect = (newValue) => {
    setStartTime(convert.formattedToUnix(newValue.$d));
    console.log(convert.formattedToUnix(newValue.$d))
  }

  useEffect(() => {
    console.log(startTime);
  }, [startTime]);

  const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  return (
    <Dialog
      open={createJamModalOpen}
      onClose={() => setCreateJamModalOpen(false)}
    >
      <DialogTitle>Create Jam</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Jam Title"
          type="text"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
        <BasicDatePicker
          time={startTime.toString()}
          onChange={(e) => setStartTime(convert.formattedToUnix(e.$d))}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Jam Time Limit (in minutes)"
          type="text"
          fullWidth
          onChange={(e) => setTimeLimit(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Jam URL"
          type="text"
          fullWidth
          onClick={(e) => setJamUrl(e.target.value)}
        />
        {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Jam Options"
              type="text"
              fullWidth
            /> */}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Jam Image URL"
          type="text"
          fullWidth
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {isValidImageUrl(imageUrl) && (
          <img
            style={{ width: "100%", height: "100%", marginTop: "10px" }}
            src={imageUrl}
            alt="jam image preview"
          />
        )}
        <Stack sx={{ pt: 5 }} spacing={2}>
          <Button
            size="large"
            variant="contained"
            color="success"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            onClick={() => setCreateJamModalOpen(false)}
            size="large"
            variant="contained"
          >
            Cancel
          </Button>
          {/* <Button
                onClick={() => setCreateJamModalOpen(false)}
                size="large"
                variant="contained"
                color="error"
              >
                Delete
              </Button> */}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
