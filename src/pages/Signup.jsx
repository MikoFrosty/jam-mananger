import { useEffect, useState } from "react";
import styles from "../css/Pages/Authenticate.module.css";
import SignupForm from "../Forms/SignupForm";
import NumberPicker from "../components/inputs/NumberPicker";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modify from "./Modify";

export default function Authenticate() {
  const navigate = useNavigate()
  const [accountType, setAccountType] = useState("freelancer");
  const [authDirection, setAuthDirection] = useState(null);
  const [value, setValue] = useState(50);

  const searchParams = new URLSearchParams(location.search);
  const direction = searchParams.get('direction');
  const user_id = searchParams.get("user_id");
  const type = searchParams.get("type");
  
  function selectAccountType( type ) {
    setAccountType(type);
  }

  useEffect(() => {
    if (direction) {
      setAuthDirection(direction);
    } else {
      setAuthDirection("signup");
    }
  }, [direction])

    function handleValueChange(num) {
        setValue(parseInt(num));
      }

    function adjustValue(num) {
        num = parseInt(num)
        if (value > 0) {
            setValue(value + num);
        } else if (value === 0 && num === 1) {
            setValue(value + num)
        }
    }
  
    function handleNavigate(destination) {
      navigate(destination);
    }

  return (
    <div className={styles.AuthenticatePage}>
      { direction === "signup" || direction === "login" ? (<div className={styles.MessageBox}>
        {authDirection === "signup" ? (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontWeight: 700, color: "white" }}>Welcome to Kamari</h1>
              <p style={{ color: "white" }}>
                We are excited you have decided to use the world's fastest-growing job board. Not only do we offer completely free Kamari job postings and applications, we also offer an advanced contract management solution for non direct hire roles.
              </p>
            </div>
            <div>
              <div className={styles.PricingSection}>
                <h3 style={{ color: "white", marginBottom: "10px" }}>Our Pricing is Simple</h3>
                <div className={styles.PricingOptions}>
                  <div className={styles.PricingOption}>
                      <h3 style={{margin: "0px 0px 0px 0px"}}>Job Seekers</h3>
                      <h5 style={{margin: "0px 0px 20px 0px"}}>free</h5>
                      <ul className={styles.FeatureList}>
                        <li>Unlimited applications</li>
                        <li>Client messaging</li>
                        <li>Weekly inbox delivered contracts</li>
                        <li>Contracts worked on Kamari take home 100% of earned income</li>
                        <li>Hosted Portfolio Link</li>
                        <li>Access to job search and filtering</li>
                        <li>100% Remote Only Work</li>
                      </ul>
                    </div>
                    <div className={styles.PricingOption}>
                      <h3 style={{margin: "0px 0px 0px 0px"}}>Companies</h3>
                      <h5 style={{margin: "0px 0px 20px 0px"}}>free</h5>
                      <ul className={styles.FeatureList}>
                        <li>Unlimited Kamari jobs & contracts</li>
                        <li>No contract invoice fees</li>
                        <li>Hosted Company Page</li>
                        <li>Unlimited applications on each contract</li>
                        <li>Paid dispersion to other boards</li>
                        <li>Find workers using the advanced talent search tool</li>
                      </ul>
                    </div>
                </div>
                </div>
            </div>
          </div>
        ) : (
          null
        )}
      </div>) : null}
      <div style={direction !== ("signup"|"login") ? {width: "100%"} : {}} className={styles.AuthBox}>
        {
          authDirection === "signup" ? (
            <div style={{ textAlign: "left" }}>
              <SignupForm />
            </div>
          ) : authDirection === "modify" ? (
            <Modify type={type} user_id={user_id}/>
          ) : null
        }
        {
          direction === ("signup"|"login") ? (
            <div className={styles.AlternateDirections}>
              <Typography onClick={() => handleNavigate("/home?direction=login")} className={styles.AlternateDirection} variant="caption">Already Have an Account</Typography>
              <Typography onClick={() => handleNavigate("/forgot-password")} className={styles.AlternateDirection} variant="caption">Forgot Password</Typography>
            </div>
          ) : null
        }
      </div>
    </div>
  );
}