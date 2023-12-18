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
import AuthContext from "../../Contexts/AuthContext";
import { useContext } from "react";
import fetchWrapper from "../../utils/fetchWrapper";
import AppBarComponent from "../AppBar/AppBarComponent";

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

export default function DashboardTest() {
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const [createJamModalOpen, setCreateJamModalOpen] = useState(false);
  const [jamListData, setJamListData] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [selectedData, setSelectedData] = useState(["All"]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const new_selections =
      typeof value === "string" ? value.replace.split(",") : value;

    const set1 = new Set(selectedData);
    const set2 = new Set(new_selections);
    const new_value = [
      ...selectedData.filter((item) => !set2.has(item)),
      ...new_selections.filter((item) => !set1.has(item)),
    ][0];

    console.log("LOOK HEREEEEE", new_value)

    if (new_value !== "All" && selectedData.includes("All")) {
      setSelectedData([value.pop("All")]);
    } else if (new_value !== "All") {
      setSelectedData(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } else if (new_value === "All" || new_selections.length === 0) {
      setSelectedData(["All"]);
    }
  };

  useEffect(() => {
    if (refetch) {
      fetchWrapper("/jams", token, "GET", null).then((res) => {
        console.log("fetchWrapper JamListData", res);
        setJamListData(res.jams);
      });
      setRefetch(false);
    }
    else {
      if (selectedData.length === 0) {
        setSelectedData(["All"]);
      }
    }
  }, [refetch, selectedData]);

  const onSave = (newJam) => {
    const parsedUser = JSON.parse(user);
    console.log('parsed user', parsedUser);
    const body = {
      ...newJam,
      jam_group_id: parsedUser.jam_groups[0],
    };

    fetchWrapper("/create_jam", token, "POST", body).then((res) => {
      console.log(res);
      if (!res) {
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
          Authorization: token,
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
        <Container maxWidth="lg">
          <AppBarComponent token={token} handleChange={handleChange} selectedData={selectedData}/>
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
