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

import Chats from "./Chats";
import { useGetFriends } from "../../../hooks/hooks";

import Teams from "../teams/Teams";
import { ThemeInterface, UserInterFace } from "../../../interfaces/myprofile";

const closedMixin = (theme: any): React.CSSProperties => ({
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
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Tabs({
  value,
  colleagues,
  showMoreFriends,
  showButton,
  buttonHandler,
  closeMorePeopleHandler,
  toggleShowTeam,
  openCreateTeam,
}: {
  value: "chats" | "team";
  colleagues: UserInterFace[];
  showMoreFriends: boolean;
  showButton: boolean;
  buttonHandler: () => void;
  closeMorePeopleHandler: () => void;
  toggleShowTeam: () => void;
  openCreateTeam: boolean;
}) {
  return (
    <Box sx={{ width: "100%", typography: "body1", overflow: "hidden" }}>
      <TabContext value={value}>
        <TabPanel value="chats">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            <Chats
              buttonHandler={buttonHandler}
              closeMorePeopleHandler={closeMorePeopleHandler}
              colleagues={colleagues}
              showButton={showButton}
              showMoreFriends={showMoreFriends}
              key={"Chats-Component"}
              // friends={friends}
              // showMoreFriends={showMoreFriends}
              // showButton={showButton}
              // friendClicked={friendClicked}
              // buttonHandler={buttonHandler}
              // closeMorePeopleHandler={closeMorePeopleHandler}
              // clickFriendHandler={clickFriendHandler}
              // clearFriendHandler={clearFriendHandler}
            />
          </Box>
        </TabPanel>
        <TabPanel value="team">
          <Box
            sx={{
              margin: "-20px",
            }}
          >
            <Teams
              toggleShowTeam={toggleShowTeam}
              openCreateTeam={openCreateTeam}
            />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default function ChatLeft({ user }: { user: UserInterFace }) {
  const [value, setValue] = React.useState<"chats" | "team">("chats");
  const friends: UserInterFace[] = useGetFriends();
  const [showMoreFriends, setShowMoreFriends] = React.useState(false);
  const [showButton, setShowButton] = React.useState(true);
  // Team States
  const [openCreateTeam, setOpenCreateTeam] = React.useState(false);
  // const theme: ThemeInterface = useTheme();

  const buttonHandler = () => {
    setShowMoreFriends(true);
    setShowButton(false);
  };
  const closeMorePeopleHandler = () => {
    setShowMoreFriends(false);
    setShowButton(true);
  };

  const handleChange = (_: any, newValue: "chats" | "team") => {
    setValue(newValue);
  };

  // Team Handler
  const toggleShowTeam = () => {
    setOpenCreateTeam((prev) => !prev);
  };
  const theme: ThemeInterface = useTheme();
  return (
    <Box
      sx={{
        // unscrollable
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      <Drawer
        sx={{
          bgcolor: theme.colors.background,
        }}
        variant="permanent"
      >
        <ProfileDialog handleChange={handleChange} value={value} user={user} />

        <Tabs
          value={value}
          // handleChange={handleChange}
          colleagues={friends}
          showMoreFriends={showMoreFriends}
          showButton={showButton}
          buttonHandler={buttonHandler}
          closeMorePeopleHandler={closeMorePeopleHandler}
          // Teams
          toggleShowTeam={toggleShowTeam}
          openCreateTeam={openCreateTeam}
        />
      </Drawer>
    </Box>
  );
}

const ProfileDialog: React.FC<{
  user: UserInterFace;
  handleChange: (_: any, newValue: "chats" | "team") => void;
  value: "chats" | "team";
}> = ({ user, handleChange, value }) => {
  const theme: ThemeInterface = useTheme();
  return (
    <>
      {user ? (
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
                <Avatar src={user.profilePic ? user.profilePic.fileUrl : ""}>
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
      ) : null}
    </>
  );
};
