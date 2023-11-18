import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Divider,
  Typography,
  ListItem,
  ListItemButton,
  List,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "@fontsource/open-sans/500.css"; // Weight 500.
import { useRouter } from "next/router";

// Icons
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ExploreIcon from "@mui/icons-material/Explore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Groups3Icon from "@mui/icons-material/Groups3";
import { ThemeInterface } from "../../../interfaces/myprofile";
const drawerWidth = 300;

const useStyles = makeStyles({
  listItem: {
    backgroundColor: "white",
    marginTop: "7px",
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  width: "15px",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
}));

export default function PeopleLeft() {
  const theme: ThemeInterface = useTheme();
  const classes = useStyles();
  const router = useRouter();
  const pathname = router.pathname;
  const [friendsRequestColor, setFriendsRequestColor] = React.useState<
    "action" | "secondary"
  >("action");
  const [friendsColor, setFriendsColor] = React.useState<
    "action" | "secondary"
  >("action");
  const [exploreColor, setExploreColor] = React.useState<
    "action" | "secondary"
  >("action");

  React.useEffect(() => {
    if (pathname.includes("/friends")) {
      setFriendsColor("secondary");
      setExploreColor("action");
      setFriendsRequestColor("action");
    } else if (pathname.includes("/explore")) {
      setFriendsColor("action");
      setExploreColor("secondary");
      setFriendsRequestColor("action");
    } else if (pathname.includes("/friendrequests")) {
      setFriendsColor("action");
      setExploreColor("action");
      setFriendsRequestColor("secondary");
    }
  }, []);

  return (
    <Box>
      <CssBaseline />
      <Drawer
        sx={{ backgroundColor: theme.colors.background }}
        variant="permanent"
      >
        <Box
          sx={{
            display: "flex",
            alignItem: "center",
            textAlign: "center",
            paddingTop: "16px",
            // paddingLeft: "8px",
            backgroundColor: theme.colors.background1,
            height: "70px",
            gap: 1,
          }}
        >
          <Groups3Icon fontSize="large" color="secondary" />
          <Typography variant="h5" component="h4" color="secondary" noWrap>
            Colleague
          </Typography>
        </Box>
        <Divider />
        <List sx={{ m: 0.1 }}>
          {/* Friend Request Button */}
          <ListItem
            sx={{
              borderRadius: "8px",
              // if pathname is /friendrequests, background color is gray
              backgroundColor: pathname.includes("/colleaguerequests")
                ? theme.colors.background1
                : "unset",
              "&:hover": {
                backgroundColor: theme.colors.textBackground,
                borderRadius: "8px",
              },
            }}
            disablePadding
          >
            <ListItemButton
              role={undefined}
              sx={{
                justifyContent: "space-between",
              }}
              dense
              onClick={() => {
                router.push("/colleagues/colleaguerequests");
              }}
            >
              <Box
                sx={{
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <PersonAddAlt1Icon
                  fontSize="small"
                  color={friendsRequestColor}
                />
                <ListItemText
                  color={friendsRequestColor}
                  primary="Colleague Requests"
                />
              </Box>
              <ArrowForwardIcon fontSize="small" color={friendsRequestColor} />
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              borderRadius: "8px",

              marginTop: "5px",
              // if pathname is /friends, background color is gray
              backgroundColor: pathname.includes("/mycolleagues")
                ? theme.colors.background1
                : "unset",
              "&:hover": {
                backgroundColor: theme.colors.textBackground,
                borderRadius: "8px",
              },
            }}
            disablePadding
          >
            {/* Friends Button */}
            <ListItemButton
              role={undefined}
              sx={{
                justifyContent: "space-between",
              }}
              dense
              onClick={() => {
                router.push("/colleagues/mycolleagues");
              }}
            >
              <Box
                sx={{
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <PeopleRoundedIcon fontSize="small" color={friendsColor} />
                <ListItemText color={friendsColor} primary="My Colleague" />
              </Box>
              <ArrowForwardIcon fontSize="small" color={friendsColor} />
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              marginTop: "5px",
              borderRadius: "8px",

              // if pathname is /explore, background color is gray
              backgroundColor: pathname.includes("/explore")
                ? theme.colors.background1
                : "unset",
              "&:hover": {
                backgroundColor: theme.colors.textBackground,
                borderRadius: "8px",
              },
            }}
            disablePadding
          >
            {/* Discover People button */}
            <ListItemButton
              role={undefined}
              sx={{
                gap: "10px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              dense
              onClick={() => {
                router.push("/colleagues/explore");
              }}
            >
              <Box
                sx={{
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  display: "flex",
                }}
              >
                <ExploreIcon fontSize="small" color={exploreColor} />
                <ListItemText
                  color={exploreColor}
                  primary="Build Your Network"
                />
              </Box>
              <ArrowForwardIcon fontSize="small" color={exploreColor} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
