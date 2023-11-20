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
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import Logo from "../../../assets/Logo";
import NewMeet from "../meets/NewMeet";
import Signout from "../login/Signout";
import Notification from "./Notification";
import Groups3Icon from "@mui/icons-material/Groups3";
import { ThemeInterface } from "../../../interfaces/myprofile";

const closedMixin = (theme: any): React.CSSProperties => ({
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
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DrawerComponent() {
  const router = useRouter();
  const theme: ThemeInterface = useTheme();

  const [open, setOpen] = useState(false);
  const [homeColor, setHomeColor] = useState<"action" | "secondary">("action");
  const [chatColor, setChatColor] = useState<
    | "inherit"
    | "action"
    | "disabled"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
  >("inherit");
  const [peopleColor, setPeopleColor] = useState<
    | "inherit"
    | "action"
    | "disabled"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
  >("inherit");
  const [calendar, setCalendar] = useState<
    | "inherit"
    | "action"
    | "disabled"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
  >("inherit");
  const [meet, setMeet] = useState<
    | "inherit"
    | "action"
    | "disabled"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
  >("inherit");
  const [projectsColor, setProjectsColor] = useState<
    | "inherit"
    | "action"
    | "disabled"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
  >("inherit");
  // Background color
  const [homeBackgroundColor, setHomeBackgroundColor] = useState("");
  const [chatBackgroundColor, setChatBackgroundColor] = useState("");
  const [peopleBackgroundColor, setPeopleBackgroundColor] = useState("");
  const [calenderBackgroundColor, setCalenderBackgroundColor] = useState("");
  const [meetBackgroundColor, setMeetBackgroundColor] = useState("");
  const [projectBackgroundColor, setProjectBackgroundColor] = useState("");
  const [myProfileBackgroundColor, setMyProfileBackgroundColor] = useState("");

  const pathname = router.pathname;

  useEffect(() => {
    if (pathname.includes("/chat")) {
      setHomeColor("action");
      setChatColor("secondary");
      setPeopleColor("inherit");
      setCalendar("inherit");
      setMeet("inherit");
      // Background color
      setChatBackgroundColor(theme.colors.drawerBackground);
      setPeopleBackgroundColor("");
      setCalenderBackgroundColor("");
      setMeetBackgroundColor("");
    } else if (
      pathname.includes("/colleagues") ||
      pathname.includes("/profile")
    ) {
      setChatColor("inherit");
      setPeopleColor("secondary");
      setCalendar("inherit");
      setMeet("inherit");
      // Background color
      setChatBackgroundColor("");
      setPeopleBackgroundColor(theme.colors.drawerBackground);
      setCalenderBackgroundColor("");
      setMeetBackgroundColor("");
    } else if (pathname === "/calender") {
      setChatColor("inherit");
      setPeopleColor("inherit");
      setCalendar("secondary");
      setMeet("inherit");
      // Background color
      setChatBackgroundColor("");
      setPeopleBackgroundColor("");
      setCalenderBackgroundColor(theme.colors.drawerBackground);
      setMeetBackgroundColor("");
    } else if (pathname === "/meet") {
      setChatColor("inherit");
      setPeopleColor("inherit");
      setCalendar("inherit");
      setMeet("secondary");
      // Background color
      setChatBackgroundColor("");
      setPeopleBackgroundColor("");
      setCalenderBackgroundColor("");
      setMeetBackgroundColor(theme.colors.drawerBackground);
    } else if (pathname.includes("/work")) {
      setHomeColor("secondary");
      setChatColor("inherit");
      setPeopleColor("inherit");
      setCalendar("inherit");
      setMeet("action");
      // Background color
      setChatBackgroundColor("");
      setPeopleBackgroundColor("");
      setCalenderBackgroundColor("");
      setHomeBackgroundColor(theme.colors.drawerBackground);
    } else if (pathname.includes("/projects")) {
      setHomeColor("action");
      setChatColor("inherit");
      setPeopleColor("inherit");
      setCalendar("inherit");
      setMeet("action");
      setProjectsColor("secondary");
      // Background color
      setChatBackgroundColor("");
      setPeopleBackgroundColor("");
      setCalenderBackgroundColor("");
      setHomeBackgroundColor("");
      setProjectBackgroundColor(theme.colors.drawerBackground);
    } else if (pathname.includes("/myprofile")) {
      setHomeColor("action");
      setChatColor("inherit");
      setPeopleColor("inherit");
      setCalendar("inherit");
      setMeet("action");
      setProjectsColor("action");
      // Background color
      setChatBackgroundColor("");
      setPeopleBackgroundColor("");
      setCalenderBackgroundColor("");
      setHomeBackgroundColor("");
      setProjectBackgroundColor("");
      setMyProfileBackgroundColor(theme.colors.drawerBackground);
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
              {/* Work */}
              <Tooltip title="Work" placement="right-start">
                <ListItemButton
                  // button
                  onClick={() => {
                    router.push("/work");
                  }}
                  sx={{
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: homeBackgroundColor,
                  }}
                >
                  <ListItemIcon>
                    <BusinessRoundedIcon fontSize="medium" color={homeColor} />
                  </ListItemIcon>
                  <ListItemText primary="Work" />
                </ListItemButton>
              </Tooltip>
              {/* Chats */}
              <Tooltip title="Chats" placement="right-start">
                <ListItemButton
                  // onClick={() => {
                  //   router.push("/chats");
                  // }}
                  href="/chats"
                  sx={{
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: chatBackgroundColor,
                  }}
                >
                  <ListItemIcon>
                    <ChatBubbleRoundedIcon
                      fontSize="medium"
                      color={chatColor}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Chats" />
                </ListItemButton>
              </Tooltip>
              {/* People */}
              <Tooltip title="Colleagues" placement="right-start">
                <ListItemButton
                  // button

                  href="/colleagues/explore"
                  sx={{
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: peopleBackgroundColor,
                  }}
                >
                  <ListItemIcon>
                    <Groups3Icon fontSize="medium" color={peopleColor} />
                  </ListItemIcon>
                  <ListItemText primary="People" />
                </ListItemButton>
              </Tooltip>
              {/* Insight */}
              <Tooltip title="Projects" placement="right-start">
                <ListItemButton
                  href="/projects/explore"
                  sx={{
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: projectBackgroundColor,
                  }}
                >
                  <ListItemIcon>
                    <LeaderboardRoundedIcon
                      fontSize="medium"
                      color={projectsColor}
                    />
                  </ListItemIcon>
                  <ListItemText primary="People" />
                </ListItemButton>
              </Tooltip>
              {/* Calendar */}
              {/* <Tooltip title="Calendar" placement="right-start">
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
              </Tooltip> */}
              {/* Meet */}
              {/* <Tooltip title="Meet" placement="right-start">
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
              </Tooltip> */}
            </List>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 4,
              left: 8,
            }}
          >
            <Notification />
            <Box>
              {/* <Tooltip title="Join">
                <NewMeet />
              </Tooltip> */}
              <Signout myProfileBackgroundColor={myProfileBackgroundColor} />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
