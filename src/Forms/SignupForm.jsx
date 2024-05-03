import { useState } from "react";
import styles from "../css/Forms.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import fetchWrapper from "../utils/fetchWrapper";

export default function SignupForm() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [type, setType] = useState("talent");
  const [errors, setErrors] = useState({});

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handlePolicyChange = (event) => {
    setPolicyAccepted(event.target.checked);
  };

  function handleNavigate(destination, landing = false) {
    if (!landing) {
      navigate(destination);
    } else {
      window.location.replace(destination);
    }
  }

  function selectAccountType(accountType) {
    setType(accountType);
  }

  function handleInputChange(input, value) {
    if (input === "email") {
        setEmail(value);
        delete errors.email;
    } else if (input === "first") {
        setFirst(value);
        delete errors.first;
    } else if (input === "last") {
        setLast(value);
        delete errors.last;
    } else if (input === "password") {
        setPassword(value);
        delete errors.password
    }
  }

  function validateInputs() {
    let isValid = true;
    const newErrors = {};

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!first.match(/^[a-zA-Z]+$/)) {
      newErrors.first = "First name must contain only letters";
      isValid = false;
    }

    if (!last.match(/^[a-zA-Z]+$/)) {
      newErrors.last = "Last name must contain only letters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleSubmit() {
    if (validateInputs()) {
      const payload = {
        email,
        password,
        name: {
          first,
          last
        },
        type
      };

      fetchWrapper("/signup", "", "POST", { ...payload }).then((res) => {
        if (res.message === "user created" && res.token) {
          localStorage.setItem("token", res.token);
          handleNavigate(`/authenticate?direction=modify&user_id=${res.user.user_id}&type=${res.user.type}`);
        }
      });
    }
  }

  return (
    <div className={styles.FormContainer}>
      <div className={styles.ContentRow}>
        <ArrowBackIcon className={styles.Icon} onClick={() => handleNavigate("https://kamariteams.com", true)} />
        <Typography variant="body1">Sign Up</Typography>
      </div>
      <div className={styles.Form}>
        <div className={styles.InputGroup}>
          <label className={styles.InputLabel}>Looking for Work or Posting Jobs?</label>
          <div className={styles.AccountTypes}>
            <div onClick={() => selectAccountType("talent")} className={`${styles.AccountType} ${type === "talent" ? styles.Selected : null}`}>
              Find Work
            </div>
            <div onClick={() => selectAccountType("company")} className={`${styles.AccountType} ${type === "company" ? styles.Selected : null}`}>
              Post Jobs
            </div>
          </div>
        </div>
        <div className={styles.InputRow}>
          <div className={styles.InputGroup}>
            <label className={styles.InputLabel}>First Name</label>
            <input onChange={(e) => handleInputChange("first", e.target.value)} autoComplete="given-name" className={styles.InputField} type="text" value={first}/>
            {errors.first && <span className={styles.ErrorMessage}>{errors.first}</span>}
          </div>
          <div className={styles.InputGroup}>
            <label className={styles.InputLabel}>Last Name</label>
            <input onChange={(e) => handleInputChange("last", e.target.value)} autoComplete="family-name" className={styles.InputField} type="text" value={last}/>
            {errors.last && <span className={styles.ErrorMessage}>{errors.last}</span>}
          </div>
        </div>
        <div className={styles.InputGroup}>
          <label className={styles.InputLabel}>Email</label>
          <input onChange={(e) => handleInputChange("email", e.target.value)} autoComplete="email" className={styles.InputField} type="email" value={email} />
          {errors.email && <span className={styles.ErrorMessage}>{errors.email}</span>}
        </div>
        <div className={styles.InputGroup}>
          <label className={styles.InputLabel}>Password</label>
          <input onChange={(e) => handleInputChange("password", e.target.value)} autoComplete="new-password" className={styles.InputField} type="password" value={password}/>
          {errors.password && <span className={styles.ErrorMessage}>{errors.password}</span>}
        </div>
        <div className={styles.TermsAndConditions}>
          <div className={styles.CheckboxGroup}>
            <label className={styles.CheckboxLabel}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={handleTermsChange}
                className={styles.Checkbox}
              />
              I accept the terms and conditions
            </label>
          </div>
          <div className={styles.CheckboxGroup}>
            <label className={styles.CheckboxLabel}>
              <input
                type="checkbox"
                checked={policyAccepted}
                onChange={handlePolicyChange}
                className={styles.Checkbox}
              />
              I accept the user policy
            </label>
          </div>
        </div>
        <button disabled={termsAccepted && policyAccepted && Object.keys(errors).length === 0 && (email !== "" && password !== "" && first !== "" && last !== "") ? false : true} className={styles.Button} onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  );
}