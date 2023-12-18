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

const mainStyle = {
  fontFamily: "Arial",
  margin: 0,
  width: "100%",
  minHeight: "100vh",
  paddingTop: "70px",
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
  console.log("selectedJams", filteredJams);
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
    setFilteredJams(filtered);
  }, [searchTerm, jamListData]);

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

  return (
    <main style={mainStyle}>
      {/* APP BAR COMPONENT HERE */}
      <></>
      {/* main layout for dashboard */}
      <Grid
        xs={12}
        item
        container
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* left side of dashboard */}
        <Grid item margin={2} width="450px" sx={{
          border: "1px solid black",
        }}>
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
