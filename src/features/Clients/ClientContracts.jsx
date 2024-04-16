import { Typography } from "@mui/material";
import styles from "../../css/Client/ClientContracts.module.css";
import AccountBar from "../Account/AccountBar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SlidingModal from "../Dashboard/SlidingModal";
import ContractCreate from "./CreateContractForm";
import Contract from "./Contract";
import { fetchContracts } from "../../StateManagement/Actions/actions";

export default function ClientContracts() {
  const dispatch = useDispatch();
  const [view, setView] = useState("Active");
  const contracts = useSelector((state) => state.app.contracts);
  const [createMode, setCreateMode] = useState(false);
  const [contractsFetched, setContractsFetched] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    if (!contractsFetched) {
      dispatch(fetchContracts("authenticated"));
      setContractsFetched(true);
    }
  }, [contractsFetched]);

  function toggleModal() {
    setCreateMode(!createMode);
  }

  useEffect(() => {
    if (contracts.length > 0 && !selectedContract) {
      setSelectedContract(contracts[0]);
    }
  }, [contracts]);

  return (
    <div className={styles.ClientContracts}>
      <SlidingModal isOpen={createMode} toggleModal={toggleModal}>
        <ContractCreate
          toggleModal={toggleModal}
          isOpen={createMode}
          type={"client"}
        />
      </SlidingModal>
      <AccountBar
        view={view}
        onViewToggle={setView}
        toggle={true}
        toggleOptions={["Active", "Closed", "Applications"]}
      >
        <button className={styles.CreateButton} onClick={toggleModal}>
          Create New Contract
        </button>
      </AccountBar>
      <div className={styles.Main}>
        <div className={styles.LeftColumn}>
          {contracts ? (
            contracts.map((this_contract, index) => {
              return (
                <Contract
                  min={this_contract.budget.min}
                  max={this_contract.budget.max}
                  selectedSkills={this_contract.skills}
                  title={this_contract.title}
                  description={this_contract.description}
                  selectedTimeline={this_contract.timeline}
                />
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
        <div className={styles.RightColumn}></div>
        {view === "Active" ? null : null}
      </div>
    </div>
  );
}
