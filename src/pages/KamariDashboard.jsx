import { Typography } from "@mui/material";
import styles from "../css/Business/KamariDashboard.module.css";
import { useState, useEffect } from "react";
import fetchWrapper from "../utils/fetchWrapper";
import HoverDropdown from "../components/HoverDropdown";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BusinessDashboard() {
  const [authenticated, setAuthenticated] = useState(false);

  const [authAttempts, setAuthAttempts] = useState(0);

  const [authCode, setAuthCode] = useState(null);
  const [selectedType, setSelectedType] = useState();
  const [selectedDuration, setSelectedDuration] = useState();
  const [generatedCode, setGeneratedCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userFound, setUserFound] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [codeCreated, setCodeCreated] = useState(false);
  const [fetchCodes, setFetchCodes] = useState(true);
  const [existingCodes, setExistingCodes] = useState();

  const code_types = [
    {
      title: "Stripe Code",
      description: "A stripe discount code",
      id: 1,
    },
    {
      title: "Affiliate Code",
      description: "An affiliate discount code",
      id: 2,
    },
  ];

  const discount_durations = [
    {
      title: "One Month Free",
      description: "Get an extra month free of Kamari Pro",
      id: 1,
    },
    {
      title: "Two Months Free",
      description: "Get an extra two months free of Kamari Pro",
      id: 2,
    },
    {
      title: "Lifetime Free",
      description: "Enjoy Kamari Pro for free - forever",
      id: 3,
    },
  ];

  useEffect(() => {
    if (fetchCodes && authCode) {
      const payload = {
        auth: authCode,
      };

      console.log(payload);

      fetchWrapper("/join-codes", "", "GET", { ...payload }).then((res) => {
        setExistingCodes(res.join_codes);
        console.log(res.join_codes);
      });

      setFetchCodes(false);
    }
  }, [fetchCodes, authCode]);

  function handleAuthCodeChange(e) {
    setAuthCode(e.target.value);
  }

  function handleSubmit() {
    console.log("submitted", authCode);
    const payload = {
      code: authCode,
    };

    fetchWrapper("/authorize-business-access", "", "POST", { ...payload }).then(
      (res) => {
        if (res.message === "AUTHORIZED") {
          setAuthenticated(true);
        } else {
          console.log("incorrect");
          setAuthAttempts(authAttempts + 1);
        }
      }
    );
  }

  function handleSearchForUser() {
    if (userEmail.length > 7) {
      const payload = {
        auth: authCode,
        email: userEmail,
      };

      console.log(payload);

      fetchWrapper("/business-user", "", "GET", { ...payload }).then((res) => {
        setUserId(res.user.user_id);
        console.log(res);
        setUserFound(true);
      });
    } else {
      console.log("not happening");
    }
  }

  function handleCodeDelete(code) {
    const filtered_codes = existingCodes.filter(
      (this_code) => this_code.code_id !== code.code_id
    );
    setExistingCodes(filtered_codes);

    const payload = {
      auth: authCode,
      code_id: code.code_id,
    };

    fetchWrapper("/join-codes", "", "DELETE", { ...payload });
  }

  function handleJoinCodeCreate() {
    const payload = {
      auth: authCode,
      account_type: "business",
      discount_type: selectedType.title.toLowerCase(),
      discount_duration: selectedDuration.title.toLowerCase(),
      code: joinCode,
      account_id: userId || "kamari",
    };

    fetchWrapper("/join-codes", "", "POST", { ...payload }).then((res) => {
      setFetchCodes(true);
      setCodeCreated(false);
    });
  }

  function handleTypeSelect(type) {
    setSelectedType(type);
  }
  function handleDurationSelect(duration) {
    setSelectedDuration(duration);
  }
  function handleEmailSearchChange(e) {
    setUserEmail(e.target.value);
  }
  function handleJoinCodeChange(e) {
    setJoinCode(e.target.value);
  }

  return (
    <div className={styles.Page}>
      {!authenticated && authAttempts < 3 ? (
        <div className={styles.Authenticator}>
          <Typography variant="caption">
            {3 - authAttempts} out of 3 attempts remaining
          </Typography>
          <input
            className={styles.AuthenticatorInput}
            onChange={(e) => handleAuthCodeChange(e)}
            type="password"
          />
          <button className={styles.AuthenticatorButton} onClick={handleSubmit}>
            Authenticate
          </button>
        </div>
      ) : !authenticated && authAttempts >= 3 ? (
        <div className={styles.Authenticator}>
          <Typography variant="h3">{`You have failed authentication. \nPlease contact your manager if there was an issue.`}</Typography>
        </div>
      ) : authenticated ? (
        <div className={styles.BusinessData}>
          <Typography textAlign={"left"} variant="h3">
            Kamari Business Dashboard
          </Typography>
          <div className={styles.BusinessMetrics}>
            <div className={styles.BusinessMetric}>
              <Typography variant="caption">Costs</Typography>
              <Typography variant="body1">$23</Typography>
            </div>
            <div className={styles.BusinessMetric}>
              <Typography variant="caption">Income</Typography>
              <Typography variant="body1">$0</Typography>
            </div>
            <div className={styles.BusinessMetric}>
              <Typography variant="caption">Burn</Typography>
              <Typography variant="body1">100%</Typography>
            </div>
          </div>
          <div className={styles.BusinessGraphs}>
            <div className={styles.ContentRow}>
              <Typography style={{ textAlign: "left" }} variant="caption">
                Business Visuals
              </Typography>
            </div>
          </div>
          <div className={styles.BusinessSettings}>
            <div className={styles.ContentRow}>
              <Typography style={{ textAlign: "left" }} variant="caption">
                Business Settings
              </Typography>
              <button
                style={{ width: "fit-content", alignSelf: "end" }}
                onClick={() => setCodeCreated(!codeCreated)}
              >
                {!codeCreated ? "Create a New Code" : "Cancel Code Creation"}
              </button>
            </div>
            {codeCreated ? (
              <div className={styles.JoinCode}>
                <Typography variant="caption">Create a Join Code</Typography>
                <div className={styles.JoinCodeOptions}>
                  <HoverDropdown
                    buttonContent={
                      <Typography variant="body2">
                        {selectedType?.title || "Select a Code Type"}
                      </Typography>
                    }
                    dropdownContent={
                      <>
                        {code_types.map((type, index) => {
                          return (
                            <div
                              key={`code_type_${index}`}
                              onClick={() => handleTypeSelect(type)}
                              className={`${
                                styles.HoverDropdownContentChildren
                              } ${
                                selectedType?.title === type.title
                                  ? styles.Selected
                                  : ""
                              }`}
                            >
                              <Typography variant="body2">
                                {type.title}
                              </Typography>
                              <Typography color={"#a1a1a1"} variant="caption">
                                {type.description}
                              </Typography>
                            </div>
                          );
                        })}
                      </>
                    }
                  />
                  <HoverDropdown
                    buttonContent={
                      <Typography variant="body2">
                        {selectedDuration?.title || "Select a Duration"}
                      </Typography>
                    }
                    dropdownContent={
                      <>
                        {discount_durations.map((duration, index) => {
                          return (
                            <div
                              key={`duration_type_${index}`}
                              onClick={() => handleDurationSelect(duration)}
                              className={`${
                                styles.HoverDropdownContentChildren
                              } ${
                                selectedDuration?.title === duration.title
                                  ? styles.Selected
                                  : ""
                              }`}
                            >
                              <Typography variant="body2">
                                {duration.title}
                              </Typography>
                              <Typography color={"#a1a1a1"} variant="caption">
                                {duration.description}
                              </Typography>
                            </div>
                          );
                        })}
                      </>
                    }
                  />
                </div>
                <div className={styles.JoinCodeInputs}>
                  {!userFound ? (
                    <div className={styles.UserSearch}>
                      <input
                        value={userEmail}
                        onChange={(e) => handleEmailSearchChange(e)}
                        className={styles.AuthenticatorInput}
                        type="email"
                      />
                      <button
                        onClick={handleSearchForUser}
                        className={styles.AuthenticatorButton}
                      >
                        Search For User
                      </button>
                    </div>
                  ) : (
                    <div className={styles.UserSearch}>
                      <Typography variant="caption">
                        Creating a Join Code for {userEmail}
                      </Typography>
                      <input
                        className={styles.AuthenticatorInput}
                        value={joinCode}
                        onChange={(e) => handleJoinCodeChange(e)}
                        max={10}
                        type="text"
                      />
                      <button
                        className={styles.AuthenticatorButton}
                        onClick={handleJoinCodeCreate}
                      >
                        Create Join Code
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.ExistingCodes}>
                <div className={styles.CodeHeader}>
                  <Typography
                    style={{
                      width: "120px",
                      textOverflow: "ellipsis",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                    variant="caption"
                  >
                    Code
                  </Typography>
                  <Typography
                    style={{
                      width: "120px",
                      textOverflow: "ellipsis",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                    variant="caption"
                  >
                    Type
                  </Typography>
                  <Typography
                    style={{
                      width: "120px",
                      textOverflow: "ellipsis",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                    variant="caption"
                  >
                    Duration
                  </Typography>
                  <Typography
                    style={{
                      width: "120px",
                      textOverflow: "ellipsis",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                    variant="caption"
                  >
                    Created
                  </Typography>
                  <Typography
                    style={{
                      width: "120px",
                      textOverflow: "ellipsis",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                    variant="caption"
                  >
                    Expires
                  </Typography>
                  <Typography
                    style={{
                      width: "120px",
                      textOverflow: "ellipsis",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                    variant="caption"
                  >
                    Used
                  </Typography>
                  <Typography
                    style={{
                      width: "80px",
                      textOverflow: "ellipsis",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                    variant="caption"
                  ></Typography>
                </div>
                {existingCodes?.map((code) => {
                  return (
                    <div className={styles.Code}>
                      <Typography
                        style={{
                          width: "120px",
                          textOverflow: "ellipsis",
                          textAlign: "left",
                        }}
                        variant="caption"
                      >
                        {code.code}
                      </Typography>
                      <Typography
                        style={{
                          width: "120px",
                          textOverflow: "ellipsis",
                          textAlign: "left",
                        }}
                        variant="caption"
                      >
                        {code.account_type}
                      </Typography>
                      <Typography
                        style={{
                          width: "120px",
                          textOverflow: "ellipsis",
                          textAlign: "left",
                        }}
                        variant="caption"
                      >
                        {code.discount_duration}
                      </Typography>
                      <Typography
                        style={{
                          width: "120px",
                          textOverflow: "ellipsis",
                          textAlign: "left",
                        }}
                        variant="caption"
                      >
                        {code.created_on}
                      </Typography>
                      <Typography
                        style={{
                          width: "120px",
                          textOverflow: "ellipsis",
                          textAlign: "left",
                        }}
                        variant="caption"
                      >
                        {code.created_on}
                      </Typography>
                      <Typography
                        style={{
                          width: "120px",
                          textOverflow: "ellipsis",
                          textAlign: "left",
                        }}
                        variant="caption"
                      >
                        {code.uses || 0}
                      </Typography>
                      <Typography
                        style={{
                          width: "80px",
                          textOverflow: "ellipsis",
                          textAlign: "right",
                        }}
                        variant="caption"
                      >
                        <DeleteIcon
                          onClick={() => handleCodeDelete(code)}
                          className={styles.DeleteIcon}
                        />
                      </Typography>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
