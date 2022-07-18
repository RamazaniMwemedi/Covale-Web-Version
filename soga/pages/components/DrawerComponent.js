import { useRouter } from "next/router";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ListItemText from "@mui/material/ListItemText";
import { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";

import Signout from "./Signout";



const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
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
  borderRight: "1px solid #e0e0e0",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DrawerComponent({ signoutHandler, user }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [chatColor, setChatColor] = React.useState("gray");
  const [peopleColor, setPeopleColor] = React.useState("gray");
  const [calendar, setCalendar] = React.useState("gray");
  const [settingsColor, setSettingsColor] = React.useState("gray");
  const pathname = router.pathname;

  useEffect(
    () => {
      if (pathname.includes("/chat")) {
        setChatColor("purple");
        setPeopleColor("gray");
        setCalendar("gray");
        setSettingsColor("gray");
      } else if (pathname.includes("/people")) {
        setChatColor("gray");
        setPeopleColor("purple");
        setCalendar("gray");
        setSettingsColor("gray");
      } else if (pathname === "/calender") {
        setChatColor("gray");
        setPeopleColor("gray");
        setCalendar("secondary");
        setSettingsColor("gray");
      }
    },
    [router.pathname]
  );

  return (
    <>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className="drawer"
        classes={{
          paper: "drawerPaper",
        }}
      >
        <div className="drawerMain">
          <div className="drawerTop">
            <List>
              <div className="logo">
                <h1>
                  <i
                    style={{
                      color: "#fff",
                      fontSize: "1.5rem",
                    }}
                  >
                    c
                  </i>
                </h1>
              </div>
              <br />
              <ListItemButton
                button
                onClick={() => {
                  router.push("/chats");
                }}
                sx={{
                  borderRadius:"10px",
                  marginLeft:"3px"
                }}
              >
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill={chatColor}
                    // class="bi bi-chat-dots"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                  </svg>
                </ListItemIcon>
                <ListItemText primary="Chats" />
                <Typography variant="caption">Chat</Typography>
              </ListItemButton>
              <ListItemButton
                button
                onClick={() => {
                  router.push("/people");
                }}
                sx={{
                  borderRadius:"10px",
                  marginLeft:"3px"
                }}
              >
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill={peopleColor}
                    // class="bi bi-people"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                  </svg>
                </ListItemIcon>
                <ListItemText primary="People" />
              </ListItemButton>
              <ListItemButton
                button
                onClick={() => {
                  router.push("/calender");
                }}
                sx={{
                  borderRadius:"10px",
                  marginLeft:"3px"
                }}
              >
                <ListItemIcon>
                  <CalendarMonthRoundedIcon color={calendar} />
                </ListItemIcon>
                <ListItemText primary="Calls" />
              </ListItemButton>
            </List>
          </div>
          <Box sx={{
            position:"absolute",
            bottom:1
          }} >
            {" "}
            <List>
              <ListItemButton
                button

              >
                <ListItemIcon>
                  <VideocamRoundedIcon sx={{fontSize:"25px"}} />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
              <ListItemButton button>
                <Signout signoutHandler={signoutHandler} user={user} />
                <ListItemText primary="Sign out" />
              </ListItemButton>
            </List>
          </Box>
        </div>
      </Drawer>
    </>
  );
}
