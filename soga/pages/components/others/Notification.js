import * as React from "react";
import Box from "@mui/material/Box";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Slide,
} from "@mui/material";
import { styled, useTheme } from "@mui/styles";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Redux
import { useDispatch, useSelector } from "react-redux";

import { acceptInvite, declineInvite } from "../../../services/teams";
import { useCheckLogedinUserToken } from "../../../hooks/hooks";
import { purple } from "@mui/material/colors";
import { useRouter } from "next/router";
import { updateReadNotification } from "../../../Redux/slices/notifications";

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notificationsStore = useSelector((state) => state.notifications);
  const notifications = notificationsStore.notifications
    ? notificationsStore.notifications
    : [];
  const [category, setCategory] = React.useState("all");

  const theme = useTheme();
  const open = Boolean(anchorEl);

  const notificationsLength = notifications.filter(
    (notification) => notification.read === false
  ).length;
  const chatNotifications = notifications.filter(
    (notification) => notification.category === "chats"
  );
  console.log("chatNotifications :>> ", chatNotifications);
  const chatNotificationsLength = chatNotifications.filter(
    (notification) => notification.read === false
  ).length;

  const workNotifications = notifications.filter(
    (notification) => notification.category === "work"
  );
  const workNotificationsLength = workNotifications.filter(
    (notification) => notification.read === false
  ).length;
  const projectNotifications = notifications.filter(
    (notification) => notification.category === "project"
  );
  const projectNotificationsLength = projectNotifications.filter(
    (notification) => notification.read === false
  ).length;

  const callendarNotifications = notifications.filter(
    (notification) => notification.category === "callendar"
  );
  const callendarNotificationsLength = callendarNotifications.filter(
    (notification) => notification.read === false
  ).length;

  const meetingsNotifications = notifications.filter(
    (notification) => notification.category === "meetings"
  );
  const meetingsNotificationsLength = meetingsNotifications.filter(
    (notification) => notification.read === false
  ).length;

  const categoryHandler = (value) => {
    setCategory(value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Notification" placement="top">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <NotificationsActiveRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            // it should not be scrollable
            overflow: "hidden",

            height: "460px",
            width: "340px",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            borderRadius: "10px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              ml: 1,
              mb: 1,
              gap: "10px",
              display: "flex",
              position: "relative",
            }}
          >
            <NotificationsActiveRoundedIcon
              sx={{ mt: 0.5 }}
              fontSize="medium"
            />
            <Typography variant="h6">Nofications</Typography>
          </Box>
          <IconButton
            sx={{
              mr: 1,
              mb: 1,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <NavigationBar
          categoryHandler={categoryHandler}
          category={category}
          // Category Length
          chatNotificationsLength={chatNotificationsLength}
          workNotificationsLength={workNotificationsLength}
          projectNotificationsLength={projectNotificationsLength}
          callendarNotificationsLength={callendarNotificationsLength}
          meetingsNotificationsLength={meetingsNotificationsLength}
          notificationsLength={notificationsLength}
        />

        <Divider />
        {/* Notification will come here */}
        <Box
          sx={{
            // should be scrollable
            overflow: "auto",
            height: "360px",
            width: "340px",
            mt: 0,
            mb: 1,
            borderRadius: "10px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },

            pb: 4,
          }}
        >
          <NotificationToDisplay
            category={category}
            notifications={notifications}
            // Category
            chatNotifications={chatNotifications}
            workNotifications={workNotifications}
            projectNotifications={projectNotifications}
            callendarNotifications={callendarNotifications}
            meetingsNotifications={meetingsNotifications}
          />
        </Box>
      </Menu>
    </React.Fragment>
  );
}

const NavButton = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "11px",
  "&:hover": {
    fontWeight: "bold",
  },
  // a bottom line
  borderRadius: 0,
  textTransform: "none",
  display: "flex",
  // justifyContent: "flex-start",
}));

const UnReadNotificationsBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: purple[500],
    color: "white",
    fontWeight: "bold",
    fontSize: "10px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    top: 13,
    right: 7,
    p: "0 4px",
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

const NavigationBar = ({
  category,
  categoryHandler,
  notificationsLength,
  chatNotificationsLength,
  workNotificationsLength,
  projectNotificationsLength,
  callendarNotificationsLength,
  meetingsNotificationsLength,
}) => {
  const purpleColor = purple[500];
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        mt: 1,
        mb: 1,
        // ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <UnReadNotificationsBadge
        badgeContent={notificationsLength}
        color="secondary"
      >
        <NavButton
          sx={
            category === "all"
              ? {
                  borderBottom: `2px solid ${purpleColor}`,
                  color: purpleColor,
                }
              : {
                  color: "grey",
                }
          }
          onClick={(e) => {
            e.stopPropagation();
            categoryHandler("all");
          }}
        >
          All
        </NavButton>
      </UnReadNotificationsBadge>
      <UnReadNotificationsBadge
        badgeContent={workNotificationsLength}
        color="secondary"
      >
        <NavButton
          sx={
            category === "work"
              ? { borderBottom: `2px solid ${purpleColor}`, color: purpleColor }
              : { color: "grey" }
          }
          onClick={(e) => {
            e.stopPropagation();
            categoryHandler("work");
          }}
        >
          Work
        </NavButton>
      </UnReadNotificationsBadge>
      <UnReadNotificationsBadge
        badgeContent={chatNotificationsLength}
        color="secondary"
      >
        <NavButton
          sx={
            category === "chat"
              ? { borderBottom: `2px solid ${purpleColor}`, color: purpleColor }
              : { color: "grey" }
          }
          onClick={(e) => {
            e.stopPropagation();
            categoryHandler("chat");
          }}
        >
          Chat
        </NavButton>
      </UnReadNotificationsBadge>
      <UnReadNotificationsBadge
        badgeContent={callendarNotificationsLength}
        color="secondary"
      >
        <NavButton
          sx={
            category === "callendar"
              ? {
                  borderBottom: `2px solid ${purpleColor}`,
                  color: purpleColor,
                }
              : {
                  color: "grey",
                }
          }
          onClick={(e) => {
            e.stopPropagation();
            categoryHandler("callendar");
          }}
        >
          Callendar
        </NavButton>
      </UnReadNotificationsBadge>
      <UnReadNotificationsBadge
        badgeContent={meetingsNotificationsLength}
        color="secondary"
      >
        <NavButton
          sx={
            category === "meetings"
              ? {
                  borderBottom: `2px solid ${purpleColor}`,
                  color: purpleColor,
                }
              : {
                  color: "grey",
                }
          }
          onClick={(e) => {
            e.stopPropagation();
            categoryHandler("meetings");
          }}
        >
          Meetings
        </NavButton>
      </UnReadNotificationsBadge>
    </Box>
  );
};

// Notifications
// Join Team Notification component
const JoinTeamNotification = ({ userToken, notification }) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { subject, preview, read, token, time, priority, id } = notification;
  const [accepting, setAccepting] = React.useState(false);
  // time ago function to show time ago from now in notification
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  const acceptInviteHandler = async (e) => {
    e.stopPropagation();
    setAccepting(true);
    const response = await acceptInvite(userToken, token);
    if (response) {
      dispatch(updateReadNotification(id));
      router.push(response.data.teamUrl);
      // then send a notification 
      setAccepting(false);
    } else {
      setAccepting(false);
    }
  };

  const timePast = timeAgo(new Date(time));
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        textAlign: "left",
        m: 1,
        p: 1,
        backgroundColor: "background.paper",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#1e1e1e" : theme.palette.grey[200],
          cursor: "pointer",
        },
        mb: 1,
        // borger style
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: "10px",
      }}
    >
      <Dot read={read} />
      <Avatar
        sx={{
          // it should remain at the top
          width: 24,
          height: 24,
          alignSelf: "flex-start",
        }}
      />
      <Box>
        <Box sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
          <Box sx={{ ml: 0.2 }}>
            <Typography variant="body2">{subject}</Typography>
            <Typography variant="caption" component="div">
              {preview}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {timePast} ago
            </Typography>
          </Box>
        </Box>
        {!read && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            {!accepting ? (
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={acceptInviteHandler}
                sx={{
                  textTransform: "none",
                  // make it smaller
                  fontSize: "11px",
                  height: "20px",
                }}
              >
                Accept
              </Button>
            ) : (
              <CircularProgress size={20} />
            )}

            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Decline");
              }}
              sx={{
                textTransform: "none",
                fontSize: "11px",
                height: "20px",
              }}
            >
              Decline
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Dot = ({ read }) => {
  const theme = useTheme();
  const purpleColor = purple[500];
  return (
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        mr: 1,
        backgroundColor: !read ? purpleColor : "unset",
        alignSelf: "flex-start",
      }}
    />
  );
};

const NotificationToDisplay = ({
  category,
  notifications,
  chatNotifications,
  workNotifications,
  callendarNotifications,
  meetingsNotifications,
}) => {
  const token = useCheckLogedinUserToken();
  switch (category) {
    case "all":
      return <AllNotifications notifications={notifications} token={token} />;

    case "work":
      return <WorkNotifications workNotifications={workNotifications} />;

    case "chat":
      return (
        <ChatNotifications
          chatNotifications={chatNotifications}
          token={token}
        />
      );
    case "callendar":
      return (
        <CallendarNotifications
          callendarNotifications={callendarNotifications}
        />
      );
    case "meetings":
      return (
        <MeetingsNotifications meetingsNotifications={meetingsNotifications} />
      );
    default:
      return <AllNotifications notifications={notifications} token={token} />;
  }
};

const AllNotifications = ({ notifications, token }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      {notifications && notifications.length > 0 ? (
        notifications.map((notification, index) => {
          return (
            <Box
              sx={{
                // Style like the Menu Item
                alignItems: "flex-start",
                textAlign: "left",
                p: 0,
              }}
              key={index}
            >
              <Typography variant="body1">{notification.head}</Typography>
              <JoinTeamNotification
                userToken={token}
                notification={notification}
              />
            </Box>
          );
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            mt: 10,
          }}
        >
          <Typography variant="body1">No Notification</Typography>
        </Box>
      )}
    </Box>
  );
};

const WorkNotifications = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <Typography variant="body1">Work Notifications</Typography>
    </Box>
  );
};

const ChatNotifications = ({ chatNotifications, token }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      {chatNotifications && chatNotifications.length > 0 ? (
        chatNotifications.map((notification, index) => {
          return (
            <Box
              sx={{
                // Style like the Menu Item
                alignItems: "flex-start",
                textAlign: "left",
                p: 0,
              }}
              key={index}
            >
              <Typography variant="body1">{notification.head}</Typography>
              <JoinTeamNotification
                userToken={token}
                notification={notification}
              />
            </Box>
          );
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            mt: 10,
          }}
        >
          <Typography variant="body1">No Notification</Typography>
        </Box>
      )}
    </Box>
  );
};

const CallendarNotifications = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <Typography variant="body1">Callendar Notifications</Typography>
    </Box>
  );
};

const MeetingsNotifications = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mt: 1,
        mb: 1,
        ml: 0.5,
        // scrollable
        overflow: "auto",
      }}
    >
      <Typography variant="body1">Meeting Notifications</Typography>
    </Box>
  );
};
