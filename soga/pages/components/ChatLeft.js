import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "@fontsource/open-sans/500.css"; // Weight 500.
import { useTheme } from "@mui/styles";

import Chats from "./Chats";
import chatService from "../../services/chats";
import { Avatar } from "@mui/material";

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
  borderLeft: "1px solid white",
  borderRight: "1px solid white",
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

function Tabs({ messages, loading }) {
  const [value, setValue] = React.useState("chats");
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              backgroundColor: theme.colors.background1,
            }}
          >
            <Tab
              label="Chats"
              sx={{
                textTransform: "none",
                fontSize: "18px",
              }}
              value="chats"
            />
            <Tab
              label="Team"
              value="team"
              sx={{
                textTransform: "none",
                fontSize: "18px",
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="chats">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            <Chats messages={messages} loading={loading} />
          </Box>
        </TabPanel>
        <TabPanel value="team">Tam App will appear here</TabPanel>
      </TabContext>
    </Box>
  );
}

export default function ChatLeft({ user }) {
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const token = user ? user.token : null;

  React.useEffect(() => {
    if (token) {
      chatService
        .getChats(token)
        .then((res) => {
          setMessages(res);
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [token]);
  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent">
        <ProfileDialog user={user} />

        <Tabs messages={messages} loading={loading} />
      </Drawer>
    </Box>
  );
}

const ProfileDialog = ({ user }) => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.colors.background }}>
    
        <Box
         
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: theme.colors.background1,
              padding:"20px", 
              borderTopLeftRadius: "8px",
            }}
          >
            <Box>
              {" "}
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              >
                {user && user.username[0]}
              </Avatar>{" "}
            </Box>
            <Typography variant="h6" noWrap>
              {user && user.username}
            </Typography>
          </Box>
        </Box>
     
    </Box>
  );
};
