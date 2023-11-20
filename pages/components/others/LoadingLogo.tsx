import { CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Logo from "../../../assets/Logo";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/styles";
import { ThemeInterface } from "../../../interfaces/myprofile";

const LoadingLogo = () => {
  const theme: ThemeInterface = useTheme();
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
            background:
              "linear-gradient(to right, rgb(214, 67, 181), rgb(120, 79, 195))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
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
