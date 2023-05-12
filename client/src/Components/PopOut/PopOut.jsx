import React from "react";
import { Grid, Button, Typography } from "@mui/material";

const PopOut = (props) => {
  return props.trigger ? (
    <Grid
      container
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "#25252589",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20px",
          padding: "50px",
          backgroundColor: "#F2F3F4",
          position: "relative",
          border: "1px solid rgba(52, 152, 219, 0.7)",
        }}
      >
        <Button
          variant="text"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "red",
            boxShadow: "none",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "rotate(20deg)",
            },
          }}
          onClick={() => {
            props.setTrigger(false);
          }}
        >
          X
        </Button>
        {props.children}
      </Grid>
    </Grid>
  ) : (
    ""
  );
};

export default PopOut;
