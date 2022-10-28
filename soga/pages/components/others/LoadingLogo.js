import { CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Logo from "../../../assets/Logo";

const LoadingLogo = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "39%",
        top: "20%",
        alignItem: "center",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Logo width={300} height={300} />
      <CircularProgress size={50} color="secondary" />
    </Box>
  );
};

export default LoadingLogo;
