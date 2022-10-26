import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import "@fontsource/open-sans/500.css"; // Weight 500.
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/styles";
import { IconButton } from "@mui/material";

const closedMixin = (theme) => ({
  //
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(23)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(35)} + 1px)`,
    marginLeft: theme.spacing(8),
  },
  justifyContent: "spaceBetween",
  borderLeft: `2px solid ${theme.colors.background1}`,
  borderRight: `2px solid ${theme.colors.background1}`,
  backgroundColor: theme.colors.background,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "15px",
  flexShrink: 0,
  backgroundColor: theme.colors.background,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ProjectLeft({}) {
  const theme = useTheme();
  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent">
        {/* Main Box */}
        <Box
          sx={{
            backgroundColor: theme.colors.background1,
            height: "100vh",
            p: 1,
          }}
        >
          {/* Project box */}
          <Box>
            <Typography variant="h5">Project</Typography>
          </Box>
          <br />
          {/* Pinned projects */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Pinned</Typography>
            <IconButton>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <br />
          {/* All projects */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">All Projects</Typography>
            <IconButton>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
