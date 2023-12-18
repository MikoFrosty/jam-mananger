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
import { Grid } from "@mui/material";
import JamSearch from "../../components/JamSearch";
import JamCalendar from "../../components/JamCalendar";
import AppBarComponent from "../AppBar/AppBarComponent";

const mainStyle = {
  fontFamily: "Arial",
  margin: 0,
  width: "100%",
  minHeight: "100vh",
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
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const [createJamModalOpen, setCreateJamModalOpen] = useState(false);
  const [jamListData, setJamListData] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [filteredJams, setFilteredJams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJamGroups, setSelectedJamGroups] = useState(["All"]);
  // console.log('user from context', user);
  // console.log("token from context", token);

  useEffect(() => {
    if (refetch) {
      fetchWrapper("/jams", token, "GET", null).then((res) => {
        console.log("fetchWrapper JamListData", res);
        setJamListData(res.jams);
      });
      setRefetch(false);
    }
  }, [refetch]);

  useEffect(() => {
    const filtered = jamListData.filter((jam) =>
      jam.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ceck Jam Group filters
    if (selectedJamGroups.includes("All")) {
      setFilteredJams(filtered);
    } else {
      console.log("selectedJamGroups", selectedJamGroups);
      const filteredByGroup = filtered.filter((jam) =>
        selectedJamGroups.includes(jam.jam_group_id)
      );
      setFilteredJams(filteredByGroup);
    }
  }, [searchTerm, jamListData]);

  const handleSelectedDataChange = (event) => {
    const {
      target: { value },
    } = event;

    const new_selections =
      typeof value === "string" ? value.replace.split(",") : value;

    const set1 = new Set(selectedJamGroups);
    const set2 = new Set(new_selections);
    const new_value = [
      ...selectedJamGroups.filter((item) => !set2.has(item)),
      ...new_selections.filter((item) => !set1.has(item)),
    ][0];

    console.log("LOOK HEREEEEE", new_value);

    if (new_value !== "All" && selectedJamGroups.includes("All")) {
      setSelectedJamGroups([value.pop("All")]);
    } else if (new_value !== "All") {
      setSelectedJamGroups(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } else if (new_value === "All" || new_selections.length === 0) {
      setSelectedJamGroups(["All"]);
    }
  };

  const onSave = (newJam) => {
    const parsedUser = JSON.parse(user);
    console.log("parsed user", parsedUser);
    const body = {
      ...newJam,
      jam_group_id: parsedUser.jam_groups[0],
    };
    // const saveData = async () => {
    //   const result = await fetch(API_URL + "create_jam", {
    //     method: "POST",
    //     headers: {
    //       Authorization: token,
    //       "Content-Type": "application/json",
    //     },
    //     body,
    //   });
    //   return result.json();
    // };

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

  const handleJamSelect = (jamId) => {
    console.log("handleJamSelect", jamId);
    const selectedJam = jamListData.filter((jam) => jam._id === jamId);
    console.log("selectedJam", selectedJam);
    setFilteredJams([selectedJam]);
  };

  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleCreateJamClick = () => {
    setCreateJamModalOpen(true);
  };

  return (
    <main style={mainStyle}>
      {/* App Bar */}
      <AppBarComponent
        token={token}
        handleChange={handleSelectedDataChange}
        selectedData={selectedJamGroups}
        onCreateJamClick={handleCreateJamClick}
      />
      {/* main layout for dashboard */}
      <Grid
        xs={12}
        item
        container
        justifyContent="center"
        alignItems="flex-start"
        mt={2}
      >
        {/* left side of dashboard */}
        <Grid
          item
          margin={2}
          width="450px"
          sx={{
            border: "1px solid black",
          }}
        >
          {/* calendar section */}
          <Grid
            container
            item
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            minHeight={"400px"}
          >
            <JamCalendar />
          </Grid>
          {/* jam feed section */}
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            minHeight={"300px"}
          >
            {/* <img src={jamManagerLogo} style={logoStyle} alt="logo" /> */}
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Jam Feed Section
            </Typography>
          </Grid>
        </Grid>
        {/* Search and jam list */}
        <Grid
          margin={2}
          item
          flexDirection={"column"}
          xs
          justifyContent="flex-start"
          alignItems="center"
        >
          {/* search bar */}
          <Grid item mb={2}>
            <JamSearch
              jamList={jamListData}
              onJamSelect={handleJamSelect}
              onSearchChange={handleSearchChange}
            />
          </Grid>
          <Grid container item justifyContent={"center"} alignItems={"center"}>
            <JamList jamList={filteredJams} onDelete={handleDelete} />
          </Grid>
        </Grid>
      </Grid>
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
