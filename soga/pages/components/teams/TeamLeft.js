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
import { Avatar } from "@mui/material";

import Chats from "../chats/Chats";
import Teams from "./Teams";
import { useGetFriends } from "../../../hooks/hooks";

import chatService from "../../../services/chats";
import { getTeams } from "../../../services/teams";

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

function Tabs({
  messages,
  teams,
  loading,
  value,
  friends,
  showMoreFriends,
  showButton,
  friendClicked,
  buttonHandler,
  closeMorePeopleHandler,
  sendMessage,
  clickFriendHandler,
  clearFriendHandler,
  messageChangeHandler,
  toggleShowTeam,
  openCreateTeam,
  teamLoading,
}) {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <TabPanel value="chats">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            <Chats
              messages={messages}
              loading={loading}
              friends={friends}
              showMoreFriends={showMoreFriends}
              showButton={showButton}
              friendClicked={friendClicked}
              buttonHandler={buttonHandler}
              closeMorePeopleHandler={closeMorePeopleHandler}
              messageChangeHandler={messageChangeHandler}
              sendMessage={sendMessage}
              clickFriendHandler={clickFriendHandler}
              clearFriendHandler={clearFriendHandler}
            />
          </Box>
        </TabPanel>
        <TabPanel value="team">
          {" "}
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            <Teams
              toggleShowTeam={toggleShowTeam}
              teams={teams}
              openCreateTeam={openCreateTeam}
              teamLoading={teamLoading}
            />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default function TeamLeft({ user }) {
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const token = user ? user.token : null;
  const [value, setValue] = React.useState("team");
  // Chats States
  const friends = useGetFriends();
  const [showMoreFriends, setShowMoreFriends] = React.useState(false);
  const [showButton, setShowButton] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [friendClicked, setFriendClicked] = React.useState(null);
  // Team States
  const [openCreateTeam, setOpenCreateTeam] = React.useState(false);
  const [teams, setTeams] = React.useState([]);
  const [teamLoading, setTeamLoading] = React.useState(true);

  // Chats Handlers

  const buttonHandler = () => {
    setShowMoreFriends(true);
    setShowButton(false);
  };
  const closeMorePeopleHandler = () => {
    setShowMoreFriends(false);
    setShowButton(true);
  };

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    alert(`message: ${message} sent to ${friendClicked.username}`);
  };

  const clickFriendHandler = (friend) => {
    setFriendClicked(friend);
  };

  const clearFriendHandler = () => {
    setFriendClicked(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Team Handler
  const toggleShowTeam = () => {
    setOpenCreateTeam((prev) => !prev);
  };

  const getChatsTeams = async (token) => {
    if (token) {
      const chatsRes = await chatService.getChats(token);
      if (chatsRes) {
        setMessages(chatsRes);
        setLoading(false);
      }

      const teamsRes = await getTeams(token);
      if (teamsRes) {
        setTeams(teamsRes);
        setTeamLoading(false);
      }
    }
  };

  React.useEffect(() => {
    getChatsTeams(token);
  }, [token]);

  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent">
        <ProfileDialog handleChange={handleChange} value={value} user={user} />

        <Tabs
          messages={messages}
          value={value}
          handleChange={handleChange}
          loading={loading}
          friends={friends}
          showMoreFriends={showMoreFriends}
          showButton={showButton}
          friendClicked={friendClicked}
          buttonHandler={buttonHandler}
          closeMorePeopleHandler={closeMorePeopleHandler}
          messageChangeHandler={messageChangeHandler}
          sendMessage={sendMessage}
          clickFriendHandler={clickFriendHandler}
          clearFriendHandler={clearFriendHandler}
          // Teams
          teams={teams}
          toggleShowTeam={toggleShowTeam}
          openCreateTeam={openCreateTeam}
          teamLoading={teamLoading}
        />
      </Drawer>
    </Box>
  );
}

const ProfileDialog = ({ user, handleChange, value }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.colors.background,
        position: "sticky",
        top: "0px",
        zIndex: "1",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: theme.colors.background1,
            padding: "20px",
            borderTopLeftRadius: "8px",
            gap: "10px",
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
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              backgroundColor: theme.colors.background1,
              position: "sticky",
              top: "10px",
              zIndex: "1",
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
      </TabContext>
    </Box>
  );
};
