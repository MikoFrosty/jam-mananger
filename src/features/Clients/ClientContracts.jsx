import { Typography } from "@mui/material";
import styles from "../../css/Client/ClientContracts.module.css";
import AccountBar from "../Account/AccountBar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SlidingModal from "../Dashboard/SlidingModal";
import ContractCreate from "./CreateContractForm";
import Contract from "./Contract";
import {
  fetchApplications,
  fetchClientAccount,
  fetchContracts,
} from "../../StateManagement/Actions/actions";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import ExploreIcon from "@mui/icons-material/Explore";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Rating from "./Rating";
import fetchWrapper from "../../utils/fetchWrapper";
import ApplicationTable from "./ApplicationTable";

export default function ClientContracts() {
  const dispatch = useDispatch();
  const [view, setView] = useState("Open");
  const fetchedContracts = useSelector((state) => state.app.contracts);
  const [contracts, setContracts] = useState(null);
  const clientUser = useSelector((state) => state.app.client_user);
  const [createMode, setCreateMode] = useState(false);
  const [contractsFetched, setContractsFetched] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [contractsFiltered, setContractsFiltered] = useState(false);
  const [applications, setApplications] = useState([]);
  const [managingContract, setManagingContract] = useState(null);

  useEffect(() => {
    if (!contractsFetched) {
      dispatch(fetchContracts("authenticated"));
      setContractsFetched(true);
    }
  }, [contractsFetched]);

  useEffect(() => {
    if (view === "Applications") {
      dispatch(fetchApplications())
    }
  }, [view])

  useEffect(() => {
    if (!clientUser) {
      dispatch(fetchClientAccount());
    }
  }, [clientUser]);

  useEffect(() => {
    console.log(" ", fetchedContracts);
    setContracts(fetchedContracts);
  }, [fetchedContracts]);

  function toggleModal() {
    setCreateMode(!createMode);
    setManagingContract(!managingContract);
  }

  function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp));
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month}, ${year}`;
  }

  function toggleLocalView(view) {
    setView(view);
    setContractsFiltered(false);
  }

  useEffect(() => {
    if (contracts?.length > 0 && !selectedContract) {
      setSelectedContract(contracts[0]);
    } else if (contracts?.length === 0) {
      setSelectedContract(null);
    }
  }, [contracts]);

  function formatPostedDate(postedDate) {
    const seconds = parseInt(
      (parseInt(Date.now()) - parseInt(postedDate)) / 1000
    );

    if (seconds >= 86400) {
      return `Posted ${parseInt(seconds / 86400)} days ago`;
    } else if (seconds >= 3600 && seconds < 86400) {
      return `Posted ${parseInt(seconds / 3600)} hours ago`;
    } else if (seconds >= 60 && seconds < 3600) {
      return `Posted ${parseInt(seconds / 60)} minutes ago`;
    } else {
      return `Posted ${parseInt(seconds)} seconds ago`;
    }
  }

  useEffect(() => {
    if (contracts && !contractsFiltered && view !== "Applications") {
      const filteredContracts = fetchedContracts.filter(
        (contract) => contract.status.toLowerCase() === view.toLowerCase()
      );
      setContracts(filteredContracts);
      setContractsFiltered(true);
    }
    console.log("All Contracts", contracts);
  }, [contracts, contractsFiltered]);

  useEffect(() => {
    if (view === "Applications" && selectedContract) {
      const payload = {
        contract_id: selectedContract.contract_id,
      };

      fetchWrapper("/applications", localStorage.getItem("token"), "GET", {
        ...payload,
      }).then((res) => {
        setApplications(res.applications);
      });
    }
  }, [view, selectedContract]);

  useEffect(() => {
    console.log("Selected Contract:", selectedContract);
  }, [selectedContract]);

  function handleContractSelect(contract) {
    setSelectedContract(contract);
    console.log(contract);
  }

  function handleManageContract() {
    setManagingContract(selectedContract);
  }

  useEffect(() => {
    if (managingContract) {
      setCreateMode(true);
    }
  }, [managingContract]);

  return (
    <div className={styles.ClientContracts}>
      <SlidingModal isOpen={createMode} toggleModal={toggleModal}>
        <ContractCreate
          toggleModal={toggleModal}
          isOpen={createMode}
          type={"client"}
          selectedContract={managingContract}
        />
      </SlidingModal>
      <AccountBar
        view={view}
        onViewToggle={toggleLocalView}
        toggle={true}
        toggleOptions={["Open", "Closed", "Applications"]}
      >
        {view !== "Applications" ? (
          <button className={styles.CreateButton} onClick={toggleModal}>
            Create New Contract
          </button>
        ) : null}
      </AccountBar>
      {view === "Applications" ? (
        <div className={styles.Applications}>
          <ApplicationTable applications={applications} />
        </div>
      ) : (
        <div className={styles.Main}>
          <div className={styles.LeftColumn}>
            {contracts !== null && view !== "Applications" ? (
              contracts.map((this_contract) => {
                return (
                  <div
                    key={this_contract.contract_id}
                    onClick={() => handleContractSelect(this_contract)}
                  >
                    <Contract
                      rating={this_contract.rating}
                      type={"demo"}
                      createdDate={this_contract.created_date}
                      min={this_contract.budget?.min}
                      max={this_contract.budget?.max}
                      selectedSkills={this_contract.skills}
                      title={this_contract.title}
                      description={this_contract.description}
                      selectedTimeline={this_contract.timeline}
                      customStyle={
                        this_contract.contract_id ===
                        selectedContract?.contract_id
                          ? {
                              border: "1px solid rgb(162, 75, 248)",
                            }
                          : {
                              border: "1px solid transparent",
                            }
                      }
                    />
                  </div>
                );
              })
            ) : (
              <div
                onClick={toggleModal}
                style={{ justifyContent: "center", alignItems: "center" }}
                className={styles.Contract}
              >
                <Typography
                  style={{
                    backgroundColor: "rgba(46, 196, 182, 0.3)",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  variant="h4"
                >
                  Create a Contract
                </Typography>
              </div>
            )}
          </div>
          <div className={styles.RightColumn}>
            {view !== "Applications" ? (
              selectedContract ? (
                <div className={styles.ExpandedContract}>
                  <Typography variant="h4">{selectedContract.title}</Typography>
                  <div className={styles.ContentRow}>
                    <Typography variant="caption">
                      {formatPostedDate(selectedContract.created_date)}
                    </Typography>
                    <div className={styles.IconWithText}>
                      <ExploreIcon />
                      <Typography variant="body1">Remote (US)</Typography>
                    </div>
                  </div>
                  <div className={styles.MainContract}>
                    <div
                      style={{
                        height: "90%",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                      }}
                    >
                      <div className={styles.SelectedSkills}>
                        {selectedContract.skills.map((skill, index) => {
                          return (
                            <div
                              key={`${index}_skill`}
                              className={styles.Skill}
                            >
                              {skill.title}
                            </div>
                          );
                        })}
                      </div>
                      <text className={styles.Text}>
                        {selectedContract.description}
                      </text>
                      <Typography
                        style={{
                          backgroundColor: "rgba(162, 75, 248, 0.328)",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                        textAlign={"left"}
                      >
                        {selectedContract.timeline?.title
                          ? `The client expects this contract to last ${selectedContract.timeline?.title}`
                          : "The client expects this contract to last less than a month"}
                      </Typography>
                      <div className={styles.Budget}>
                        <div className={styles.Rate}>
                          <Typography variant="caption">
                            Hourly Minimum
                          </Typography>
                          <Typography variant="h4">
                            {`$${selectedContract.budget.min}`}
                          </Typography>
                        </div>
                        <div className={styles.Rate}>
                          <Typography variant="caption">
                            Hourly Maximum
                          </Typography>
                          <Typography variant="h4">
                            {`$${selectedContract.budget.max}`}
                          </Typography>
                        </div>
                      </div>
                      <div className={styles.AboutTheClient}>
                        <Typography variant="caption">
                          The client has been a member since{" "}
                          {formatDate(clientUser?.creation_date)}
                        </Typography>
                        <Rating rating={clientUser.rating} />
                      </div>
                    </div>
                    <div className={styles.ContractFooter}>
                      <button
                        onClick={() => handleManageContract()}
                        className={styles.ApplyButton}
                      >
                        Manage Contract
                      </button>
                      <Typography variant="body1">
                        {`${
                          selectedContract.application_count || 0
                        } Applications`}
                      </Typography>
                    </div>
                  </div>
                </div>
              ) : null
            ) : (
              <div className={styles.Applications}>
                <ApplicationTable
                  searchDisabled={true}
                  applications={applications}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
