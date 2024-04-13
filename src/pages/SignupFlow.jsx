import styles from "../css/SignupFlow.module.css";

import { Typography } from "@mui/material";
import { useState } from "react";
import StepTwo from "../features/Signup/StepTwo";

export default function SignupFlow() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("Freelancer");
  const [inputs, setInputs] = useState({
    Freelancer: {},
    Client: {},
    selectedType,
  });

  function handleInputChange(input, value) {
    const these_inputs = inputs;
    these_inputs[selectedType][input] = value;
    setInputs(these_inputs);
  }

  function handleSignup() {
    let payload = {};
    let endpoint = "";

    if (selectedType === "Freelancer") {
      payload = {
        email: inputs.Freelancer.email,
        password: inputs.Freelancer.password,
        name: {
          first_name: inputs.Freelancer.first_name,
          last_name: inputs.Freelancer.last_name
        }
      }

      endpoint = "/signup/freelancer";
    } else if (selectedType === "Client") {
      payload = {
        email: inputs.Client.email,
        password: inputs.Client.password,
        company_name: inputs.Client.company_name
      }

      endpoint = "/signup/freelancer";
    }

    
  }

  const [typeCopy, setTypeCopy] = useState({
    Freelancer: {
      cost: 8,
      description:
        "Browse jobs, apply for contracts, manage clients, and get paid for the work you do",
      features: [
        "Task Management",
        "Client Management",
        "Apply to Contracts",
        "Invoicing",
      ],
    },
    Client: {
      cost: 8,
      description:
        "Create contracts, pay invoices, manage projects, all in one place",
      features: [
        "Task Management",
        "Project Management",
        "Create Contracts",
        "Invoicing",
      ],
    },
  });

  function handleTypeSelect(type) {
    setSelectedType(type);
  }

  return (
    <div className={styles.SignupFlow}>
      {step === 1 ? (
        <>
          <Typography variant="h2">Select your account type</Typography>
          <div className={styles.AccountTypes}>
            <div
              style={
                selectedType === "Freelancer"
                  ? { scale: "1.02", border: "1px solid #333" }
                  : {}
              }
              onClick={() => handleTypeSelect("Freelancer")}
              className={styles.AccountType}
            >
              <Typography variant="h3">Freelancer</Typography>
            </div>
            <div
              style={
                selectedType === "Client"
                  ? { scale: "1.02", border: "1px solid #333" }
                  : {}
              }
              onClick={() => handleTypeSelect("Client")}
              className={styles.AccountType}
            >
              <Typography variant="h3">Client</Typography>
            </div>
          </div>
        </>
      ) : step === 2 ? (
        <StepTwo type={selectedType} handleInputChange={handleInputChange} />
      ) : null}
      <div className={styles.ButtonRow}>
        {step === 2 ? (
          <button onClick={() => handleSignup()} className={styles.NextButton}>
            Signup
          </button>
        ) : (
          <button
            onClick={() => setStep(step + 1)}
            className={styles.NextButton}
          >
            Next
          </button>
        )}
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className={styles.NextButton}
          >
            Back
          </button>
        ) : null}
      </div>
    </div>
  );
}