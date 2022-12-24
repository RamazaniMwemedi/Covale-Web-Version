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
import { Avatar } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import {
  acceptJoinTeamRequest,
  rejectJoinTeamRequest,
} from "../../../Redux/slices/notifications";

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notificationsStore = useSelector((state) => state.notifications);
  const notifications = notificationsStore
    ? notificationsStore.notifications
    : [];
  const theme = useTheme();
  console.log("notificationsStore :", notificationsStore);
  const open = Boolean(anchorEl);
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
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            // it should not be scrollable
            overflow: "hidden",

            height: "400px",
            width: "300px",
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
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        {/* Notification will come here */}
        <Box
          sx={{
            // should be scrollable
            overflow: "auto",
            height: "370px",
            width: "300px",
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
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "#1e1e1e"
                          : theme.palette.grey[100],
                      cursor: "pointer",
                    },
                  }}
                  key={index}
                >
                  {/* <Typography variant="body1">{notification.head}</Typography> */}
                  <JoinTeamNotification notification={notification} />
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
      </Menu>
    </React.Fragment>
  );
}

// Notifications
// Join Team Notification component
const JoinTeamNotification = ({ notification }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const {  id, teamId,  senderId, senderName } = notification;
  // const handleAccept = () => {
  //   dispatch(acceptJoinTeamRequest(id, teamId, senderId, currentTeam._id));
  // };
  // const handleReject = () => {
  //   dispatch(rejectJoinTeamRequest(id, teamId, senderId, currentTeam._id));
  // };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          p: 1,
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? "#1e1e1e"
                : theme.palette.grey[100],
            cursor: "pointer",
          },
          borderRadius: "10px",
          mb: 1,
        }}
      >
        <Avatar />
        <Box sx={{ ml: 1 }}>
          <Typography variant="body1">{notification.head}</Typography>
          <Typography variant="caption" component="div">
            {notification.body}
          </Typography>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <IconButton color="secondary" onClick={() => {}}>
            <CheckCircleOutlineRoundedIcon />
          </IconButton>
          <IconButton color="error" onClick={() => {}}>
            <HighlightOffRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
