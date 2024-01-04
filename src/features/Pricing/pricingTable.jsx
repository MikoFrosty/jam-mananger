import React from "react";
import LandingAppBar from "../AppBar/LandingAppBar";
import Typography from "@mui/material/Typography";

const StripePricingTable = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        height: "100vh",
      }}
    >
      <div
        style={{
          height: "100%",
          padding: "30px 30px 30px 30px",
          color: "#333",
          textAlign: "left",
        }}
      >
        <Typography variant="h2">Our Plans</Typography>
        <Typography variant="body1">
          All of our plans offer all of our available functionality. Only pay
          for the seats you need as you grow.
        </Typography>
        <stripe-pricing-table
          pricing-table-id="prctbl_1OUHtaDhEC7Qrbhy5NRVTepQ"
          publishable-key="pk_test_51OU8cxDhEC7QrbhyXNDZFKnFjl1rM9eqZElMdnx5tqaw2xDrCmAH4InT78qJO7V88S2HihXphcY2xA6Ff3mMvNtv00SgSHNfGL"
        ></stripe-pricing-table>
      </div>
    </div>
  );
};

export default StripePricingTable;
