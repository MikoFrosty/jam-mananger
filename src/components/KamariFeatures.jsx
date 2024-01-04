import React from "react";

import BlurOnIcon from "@mui/icons-material/BlurOn";

export default function KamariFeature({ children, index }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: `${(index + 1) % 2 === 0 ? "row-reverse" : "row"}`,
        width: "100%",
        justifyContent: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <BlurOnIcon />
        <div
          style={{ width: "2px", height: "300px", border: "2px solid #f1f1f1" }}
        />
        <BlurOnIcon />
      </div>
      <div
        style={{ display: "column", textAlign: "left", marginBottom: "15px" }}
      >
        {children}
      </div>
    </div>
  );
}
