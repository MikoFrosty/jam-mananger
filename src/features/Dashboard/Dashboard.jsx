import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CreateJamModal from "./CreateJamModal";
import AuthContext from "../../Contexts/AuthContext";
import { useContext } from "react";
import fetchWrapper from "../../utils/fetchWrapper";
import { Grid } from "@mui/material";
import JamSearch from "../../components/JamSearch";
import AppBarComponent from "../AppBar/AppBarComponent";
import JamForecast from "../../components/JamForecast";
import styles from "../../css/Dashboard.module.css";
import Pie from "../../components/charts/pie";
import SparkLine from "../../components/charts/sparkline";
import KamariList from "../../components/list";

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

const PieChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
  },
};

const API_URL = "https://jams-manager-2be71439fdcd.herokuapp.com/";

export default function Dashboard() {
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const [createJamModalOpen, setCreateJamModalOpen] = useState(false);
  const [jamListData, setJamListData] = useState([]);
  const [taskListData, setTaskListData] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [filteredJams, setFilteredJams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJamGroups, setSelectedJamGroups] = useState(["All"]);
  const [alerts, setAlerts] = useState([]);

  // useEffect(() => {
  //   if (refetch) {
  //     fetchWrapper("/jams", token, "GET", null).then((res) => {
  //       console.log("fetchWrapper JamListData", res);
  //       setJamListData(res.jams);
  //     });
  //     setRefetch(false);
  //   }
  // }, [refetch]);

  //   // Check Jam Group filters
  //   if (selectedJamGroups.includes("All")) {
  //     setFilteredJams(filtered);
  //   } else {
  //     console.log("selectedJamGroups", selectedJamGroups);
  //     const filteredByGroup = filtered.filter((jam) =>
  //       selectedJamGroups.includes(jam.jam_group_id)
  //     );
  //     setFilteredJams(filteredByGroup);
  //   }
  // }, [searchTerm, jamListData]);

  useEffect(() => {
    fetchWrapper("/tasks", token, "GET", {
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setTaskListData(res.tasks);
    })
    fetchWrapper("/alerts", token, "GET", {
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setAlerts(res.alerts);
    });
  }, []);

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

    console.log("Logging New Jam Payload", body);

    fetchWrapper("/create_jam", token, "POST", body).then((res) => {
      console.log(res);
      if (!res) {
        console.log("Error saving data");
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
            borderRight: "2px solid #f4f4f4",
            paddingRight: "5px",
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
            width={"100%"}
          >
            {/* <JamCalendar /> */}
            <JamForecast
              jams={jamListData}
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          {/* jam feed section */}
          <Grid
            container
            item
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              marginTop: "10px",
            }}
          >
            <Typography variant="body1">Notifications</Typography>
            <KamariList items={alerts} />
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
          <Grid item mb={2} textAlign={"left"}>
            <Typography variant="caption">Performance</Typography>
            <div className={styles.Kpis}>
              <div className={styles.Kpi}>
                <Typography variant="caption">Tasks</Typography>
                <Pie
                  colors={["#11d99b", "#00cefe", "#ff6c6c"]}
                  height={200}
                  width={200}
                  tasks={taskListData}
                />
              </div>
              <div className={styles.Kpi}>
                <Typography variant="caption">Backlog Trend</Typography>
                <SparkLine
                  series={[1, 4, 2, 5, 7, 2, 4, 6]}
                  height={100}
                  plotType={"line"}
                  colors={["#ff6c6c"]}
                />
              </div>
            </div>
          </Grid>
          {/* search bar */}
          <Grid item mb={2}>
            <JamSearch
              jamList={taskListData}
              onJamSelect={handleJamSelect}
              onSearchChange={handleSearchChange}
            />
          </Grid>
          <Grid
            container
            item
            justifyContent={"center"}
            alignItems={"center"}
            overflow={"hidden"}
          >
            {/* <BasicTable /> */}
            {/* <JamList jamList={filteredJams} onDelete={handleDelete} /> */}
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
