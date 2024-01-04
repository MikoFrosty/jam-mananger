import React from "react";
import Box from '@mui/material/Box'

function Card({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1",
        flexDirection: "column",
        height: "fit-content",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px 0px #f1f1f1",
        backgroundColor: "white",
        textAlign: "left"
      }}
    >
      {
        children
      }
    </Box>
  );
}

export default Card;
