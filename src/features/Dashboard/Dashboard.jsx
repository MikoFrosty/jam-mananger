import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import jamManagerLogo from "../../assets/jam-manager-logo-500.png";
import JamList from "./JamList";
import CreateJamModal from "./CreateJamModal";
const AuthorizationHeader = import.meta.env.VITE_AUTHORIZATION_HEADER;

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

const mockJamList = [
  {
    created_timestamp: "1702178798644",
    jam_url: "facebook.com",
    options: "",
    time_limit: "1",
    title: "MOCK JAM",
    image_url: "",
  },
];

export default function Dashboard() {
  const [createJamModalOpen, setCreateJamModalOpen] = useState(false);
  const [jamListData, setJamListData] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [Authorization, setAuthorization] = useState(
    localStorage.getItem("Authorization") || AuthorizationHeader
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL + "jams", {
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setJamListData(data);
    };
    if (refetch) {
      fetchData();
      setRefetch(false);
    }
  }, [refetch]);

  const onSave = (newJam) => {
    const saveData = async () => {
      await fetch(API_URL + "create_jam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJam),
      });
    };
    saveData().then((data) => {
      if (data.status !== 200) {
        console.log("Error saving data");
        return;
      } else {
        setCreateJamModalOpen(false);
        setRefetch(true);
      }
    });
  };

  return (
    <main style={mainStyle} id="TESTTESTTEST">
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
        <JamList jamList={jamListData} />
      </Container>
      {createJamModalOpen && (
        <CreateJamModal
          onSave={onSave}
          createJamModalOpen={createJamModalOpen}
          setCreateJamModalOpen={setCreateJamModalOpen}
        />
      )}
    </main>
  );
}
