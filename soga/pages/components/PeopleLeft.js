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
const drawerWidth = 300;

const useStyles = makeStyles({
  listItem: {
    backgroundColor: "white",
    marginTop: "7px",
  },
});

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

export default function PeopleLeft() {
  const classes = useStyles();
  const router = useRouter();
  const pathname = router.pathname;
  const [friendsRequestColor, setFriendsRequestColor] =
    React.useState("action");
  const [friendsColor, setFriendsColor] = React.useState("action");
  const [exploreColor, setExploreColor] = React.useState("action");

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
      <Drawer variant="permanent">
        <Box
          sx={{
            display: "flex",
            alignItem: "center",
            textAlign: "center",
            paddingTop: "8px",
            paddingLeft: "8px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="purple"
            // class="bi bi-link-45deg"
            viewBox="0 0 16 16"
          >
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
          </svg>
          <Typography variant="h4" component="h4" color="secondary" noWrap>
            People
          </Typography>
        </Box>
        <Divider />
        <List sx={{ width: "100%", maxWidth: 360 }}>
          {/* Friend Request Button */}
          <ListItem
            sx={{
              borderTopRightRadius: "16px",
              borderBottomRightRadius: "16px",
              // if pathname is /friendrequests, background color is gray
              backgroundColor: pathname.includes("/friendrequests")
                ? "rgba(255, 255, 255, 0.08)"
                : "unset",
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
                router.push("/people/friendrequests");
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
                  fontSize="large"
                  color={friendsRequestColor}
                />

                <Typography variant="body1" color={friendsRequestColor} noWrap>
                  Friends Requests
                </Typography>
              </Box>
              <ArrowForwardIcon fontSize="large" color={friendsRequestColor} />
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              borderTopRightRadius: "16px",
              borderBottomRightRadius: "16px",
              marginTop: "5px",
              // if pathname is /friends, background color is gray
              backgroundColor: pathname.includes("/friends") ? "gray" : "unset",
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
                router.push("/people/friends");
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
                <PeopleRoundedIcon fontSize="large" color={friendsColor} />
                <Typography variant="body1" color={friendsColor} gutterBottom>
                  Friends
                </Typography>
              </Box>
              <ArrowForwardIcon fontSize="large" color={friendsColor} />
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              marginTop: "5px",
              borderTopRightRadius: "16px",
              borderBottomRightRadius: "16px",
              // if pathname is /explore, background color is gray
              backgroundColor: pathname.includes("/explore") ? "gray" : "unset",
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
                router.push("/people/explore");
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
                <ExploreIcon fontSize="large" color={exploreColor} />
                <Typography variant="body1" color={exploreColor} gutterBottom>
                  Discover People
                </Typography>
              </Box>
              <ArrowForwardIcon fontSize="large" color={exploreColor} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
