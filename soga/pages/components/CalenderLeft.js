import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import "@fontsource/open-sans/500.css"; // Weight 500.
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import DatepickerForCalender from "./DatepickerForCalender";

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(23)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(41)} + 1px)`,
    marginLeft: theme.spacing(8.1),
  },
  backgroundColor: "#fff",
  justifyContent: "spaceBetween",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "15px",
  flexShrink: 0,
  backgroundColor: theme.palette.background.paper,
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


export default function CalenderLeft({ user, value, handleChange }) {
  const token = user ? user.token : null;

  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent">
        <Box
          sx={{
            display: "flex",
            alignItem: "center",
            textAlign: "center",
            backgroundColor: "white",
            paddingTop: "8px",
            paddingLeft: "8px",
            position: "fixed",
            width: "24%",
            zIndex: "1",
          }}
        >
          <Typography variant="h4" component="h4" color="secondary" noWrap>
            <CalendarMonthIcon fontSize="large" /> Calender
          </Typography>
        </Box>
        <br />
        <br />
        <br />
        <DatepickerForCalender handleChange={handleChange} value={value} />
      </Drawer>
    </Box>
  );
}
