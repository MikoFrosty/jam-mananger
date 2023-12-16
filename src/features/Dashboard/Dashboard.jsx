import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import jamManagerLogo from "../../assets/jam-manager-logo-500.png";
import JamList from "./JamList";
import CreateJamModal from "./CreateJamModal";
import JamModal from "../../components/JamModal";
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
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc1NTYxMjI3MDhjZTAwMDIyN2Q4YzQiLCJpYXQiOjE3MDIxOTMwMDksImV4cCI6MTcwMjIzNjIwOX0.R9JpFYqwa3ORPYG23ue5m6OX7_bUv-9FSKQvbnQksgE";

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
    //localStorage.getItem("Authorization") ||
    //AuthorizationHeader ||
    AUTH_TOKEN
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL + "jams", {
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("Error fetching data");
        return;
      } else {
        const data = await response.json();
        setJamListData(data);
      }
    };
    if (refetch) {
      fetchData();
      setRefetch(false);
    }
  }, [refetch]);

  const onSave = (newJam) => {
    const saveData = async () => {
      const result = await fetch(API_URL + "create_jam", {
        method: "POST",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJam),
      });
      return result.json();
    };
    saveData().then((data) => {
      console.log(data);
      if (!data) {
        console.log("Error saving data");
        return;
      } else {
        setCreateJamModalOpen(false);
        setRefetch(true);
      }
    });
  };

  const handleDelete = (jamId) => {
    const deleteData = async () => {
      const result = await fetch(API_URL + "jams?id=" + jamId, {
        method: "DELETE",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      });
      return result.json();
    };
    deleteData().then((data) => {
      console.log(data);
      if (!data) {
        console.log("Error deleting data");
        return;
      } else {
        setRefetch(true);
        // TODO: Close modal
      }
    });
  };

  return (
    <main style={mainStyle}>
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
        <JamList jamList={jamListData} onDelete={handleDelete} />
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
