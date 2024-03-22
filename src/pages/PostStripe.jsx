import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../css/Pages/PostStripe.module.css";
import fetchWrapper from "../utils/fetchWrapper";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Typography from "@mui/material/Typography";

export default function PostStripe() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkoutSessionId, setCheckoutSessionId] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCheckoutSessionId(searchParams.get("c_session"));
  }, []);

  useEffect(() => {
    if (checkoutSessionId) {
      setLoading(true);
      fetchWrapper("/checkout-session", localStorage.getItem("token"), "GET", {
        checkout_session_id: checkoutSessionId,
      }).then((res) => {
        setSubscription(res.subscription);
      });
    }
  }, [checkoutSessionId]);

  useEffect(() => {
    setLoading(false);
  }, [subscription]);

  useEffect(() => {
    if (!loading) {
      navigate("/");
    }
  }, [loading]);

  return (
    <div className={styles.PostStripeContainer}>
      <div className={styles.PostStripeDialogue}>
        <Typography color={"#333"} variant="h6">
          You will soon be redirected
        </Typography>
        <Skeleton width={"75vw"} height={"3px"}></Skeleton>
        <Typography variant="body1">
          But for now, enjoy this picture of a lizard
        </Typography>
        <img
          className={styles.LizardImage}
          src="https://m.media-amazon.com/images/I/81k0RVSF3eL._AC_SY879_.jpg"
          alt="image of a lizard"
        />
      </div>
    </div>
  );
}
