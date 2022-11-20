import { CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Logo from "../../../assets/Logo";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/styles";

const LoadingLogo = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
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
        <CircularProgress size={35} color="secondary" />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Typography
          sx={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          }}
          variant="h4"
          color="action"
        >
          Covale
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingLogo;
