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
import { useEffect, useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import Tooltip from "@mui/material/Tooltip";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InsightsSharpIcon from "@mui/icons-material/InsightsSharp";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import Logo from "../../assets/Logo";
import NewMeet from "./NewMeet";
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
  justifyContent: "spaceBetween",
  backgroundColor: theme.colors.background,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "15px",
  flexShrink: 0,
  backgroundColor: theme.palette.background.paper,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  borderRight: "1px solid black",
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
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [home, setHome] = useState("");
  const [chatColor, setChatColor] = useState("gray");
  const [peopleColor, setPeopleColor] = useState("gray");
  const [calendar, setCalendar] = useState("gray");
  const [meet, setMeet] = useState("gray");
  // Background color
  const [homeBackground, setHomeBackground] = useState("");
  const [chatBackgroundColor, setChatBackgroundColor] = useState("");
  const [peopleBackgroundColor, setPeopleBackgroundColor] = useState("");
  const [calenderBackgroundColor, setCalenderBackgroundColor] = useState("");
  const [meetBackgroundColor, setMeetBackgroundColor] = useState("");

  const pathname = router.pathname;

  useEffect(() => {
    if (pathname.includes("/chat")) {
      setChatColor("purple");
      setPeopleColor("gray");
      setCalendar("gray");
      setMeet("gray");
      // Background color
      setChatBackgroundColor(theme.colors.drawerBackground);
      setPeopleBackgroundColor("");
      setCalenderBackgroundColor("");
      setMeetBackgroundColor("");
    } else if (pathname.includes("/people")) {
      setChatColor("gray");
      setPeopleColor("purple");
      setCalendar("gray");
      setMeet("gray");
      // Background color
      setChatBackgroundColor("");
      setPeopleBackgroundColor(theme.colors.drawerBackground);
      setCalenderBackgroundColor("");
      setMeetBackgroundColor("");
    } else if (pathname === "/calender") {
      setChatColor("gray");
      setPeopleColor("gray");
      setCalendar("secondary");
      setMeet("gray");
      // Background color
      setChatBackgroundColor("");
      setPeopleBackgroundColor("");
      setCalenderBackgroundColor(theme.colors.drawerBackground);
      setMeetBackgroundColor("");
    } else if (pathname === "/meet") {
      setChatColor("gray");
      setPeopleColor("gray");
      setCalendar("gray");
      setMeet("secondary");
      // Background color
      setChatBackgroundColor("");
      setPeopleBackgroundColor("");
      setCalenderBackgroundColor("");
      setMeetBackgroundColor(theme.colors.drawerBackground);
    }
  }, [router.pathname, theme]);

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
        <Box>
          <Box>
            <List>
              <Box
                sx={{
                  width: "65%",
                  height: "45px",
                  borderRadius: "10px",
                  marginLeft: "10px",
                  backgroundColor: theme.colors.drawerBackground,
                  justifyContent: "center",
                  alignItem: "center",
                  textAlign: "center",
                }}
              >
                <Logo width={50} height={50} />
              </Box>
              <br />
              {/* Home */}
              <Tooltip title="Home" placement="right-start">
                <ListItemButton
                  button
                  onClick={() => {
                    router.push("/home");
                  }}
                  sx={{
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: homeBackground,
                  }}
                >
                  <ListItemIcon>
                    <HomeRoundedIcon fontSize="medium" color={home} />
                  </ListItemIcon>
                  <ListItemText primary="Chats" />
                  <Typography variant="caption">Chat</Typography>
                </ListItemButton>
              </Tooltip>
              {/* Chats */}
              <Tooltip title="Chats" placement="right-start">
                <ListItemButton
                  button
                  onClick={() => {
                    router.push("/chats");
                  }}
                  sx={{
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: chatBackgroundColor,
                  }}
                >
                  <ListItemIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill={chatColor}
                      // class="bi bi-chat-dots"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary="Chats" />
                </ListItemButton>
              </Tooltip>
              {/* People */}
              <Tooltip title="People" placement="right-start">
                <ListItemButton
                  button
                  onClick={() => {
                    router.push("/people");
                  }}
                  sx={{
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: peopleBackgroundColor,
                  }}
                >
                  <ListItemIcon>
                    <PeopleAltIcon fontSize="medium" color={peopleColor} />
                  </ListItemIcon>
                  <ListItemText primary="People" />
                </ListItemButton>
              </Tooltip>
              {/* Insight */}
              <Tooltip title="Insight" placement="right-start">
                <ListItemButton
                  button
                  onClick={() => {
                    router.push("/people");
                  }}
                  sx={{
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: peopleBackgroundColor,
                  }}
                >
                  <ListItemIcon>
                    <InsightsSharpIcon fontSize="medium" color={peopleColor} />
                  </ListItemIcon>
                  <ListItemText primary="People" />
                </ListItemButton>
              </Tooltip>
              {/* Calendar */}
              <Tooltip title="Calendar" placement="right-start">
                <ListItemButton
                  button
                  onClick={() => {
                    router.push("/calender");
                  }}
                  sx={{
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: calenderBackgroundColor,
                  }}
                >
                  <ListItemIcon>
                    <CalendarMonthRoundedIcon
                      fontSize="medium"
                      color={calendar}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Calender" />
                </ListItemButton>
              </Tooltip>
              {/* Meet */}
              <Tooltip title="Meet" placement="right-start">
                <ListItemButton
                  button
                  onClick={() => {
                    router.push("/meet");
                  }}
                  sx={{
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: meetBackgroundColor,
                  }}
                >
                  <ListItemIcon>
                    <VideocamRoundedIcon fontSize="medium" color={meet} />
                  </ListItemIcon>
                  <ListItemText primary="Calender" />
                </ListItemButton>
              </Tooltip>
            </List>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 4,
              left: 8,
            }}
          >
            <IconButton>
              <NotificationsActiveRoundedIcon fontSize="medium" />
            </IconButton>
            <Box>
              <Tooltip title="Join">
                <NewMeet />
              </Tooltip>
              <Signout signoutHandler={signoutHandler} user={user} />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
