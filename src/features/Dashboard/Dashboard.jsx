import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import jamManagerLogo from "../../assets/jam-manager-logo-500.png";
import JamList from "./Jamlist";
import { Dialog, DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { TextField } from "@mui/material";

const mainStyle = {
  color: "white",
  padding: "10px",
  fontFamily: "Arial",
  margin: 0,
  width: "100%",
};

const logoStyle = {
  width: "100%",
  maxWidth: "300px",
  height: "auto",
};

const API_URL = "https://jams-manager-2be71439fdcd.herokuapp.com/";

export default function Dashboard() {
  const [createJamModalOpen, setCreateJamModalOpen] = useState(false);
  const [jamList, setJamList] = useState([]);
  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [refetch, setRefetch] = useState(true);
  // const [jamUrl, setJamUrl] = useState("");
  // const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL + "jams");
      const data = await response.json();
      setJamList(data);
    };
    if (refetch) {
      fetchData();
      setRefetch(false);
    }
  }, [refetch]);

  const onSave = (e) => {
    e.preventDefault();
    const dataToSave = {
      title: title,
      time_limit: timeLimit,
      // jam_url: jamUrl,
      // image_url: imageUrl,
      // options: "",
    };
    const saveData = async () => {
      await fetch(API_URL + "create_jam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });
    };
    saveData();
    setCreateJamModalOpen(false);
    setRefetch(true);
  };

  return (
    <main style={mainStyle} id="TESTTESTTEST">
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 2,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <img style={logoStyle} src={jamManagerLogo} alt="Jam Manager Logo" />

          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Jam Manager is a tool for creating and managing jams.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              onClick={() => setCreateJamModalOpen(true)}
              size="large"
              sx={{ fontSize: "30px" }}
              variant="contained"
            >
              Create Jam
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <JamList jamList={jamList} />
      </Container>
      {createJamModalOpen && (
        <Dialog
          open={createJamModalOpen}
          onClose={() => setCreateJamModalOpen(false)}
        >
          {/*"Create Jam input fields go here"*/}
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
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Jam Time Limit (in minutes)"
              type="text"
              fullWidth
              onChange={(e) => setTimeLimit(e.target.value)}
            />
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Jam URL"
              type="text"
              fullWidth
            /> */}
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Jam Options"
              type="text"
              fullWidth
            /> */}
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Jam Image URL"
              type="text"
              fullWidth
            /> */}
            <Stack sx={{ pt: 5 }} spacing={2}>
              <Button
                size="large"
                variant="contained"
                color="success"
                onClick={onSave}
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
      )}
    </main>
  );
}
