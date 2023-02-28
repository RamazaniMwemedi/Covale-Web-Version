import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";

import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { signOut } from "../../../Redux/slices/calendar";

export default function Signout({}) {
  const userStore = useSelector((state) => state.user);
  const user = userStore ? userStore.user : null;
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [themeAnchor, setThemeAnchor] = useState(null);
  const themeOpen = Boolean(themeAnchor);

  const themeHandleClick = (event) => {
    setThemeAnchor(event.currentTarget);
  };
  const themeHandleClose = () => {
    setThemeAnchor(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeTheme = (mode) => {
    localStorage.setItem("theme", mode);
    theme.themeChengeHandler(mode);
  };

  const signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    dispatch(signOut());
    router.push("/login");
  };
  return (
    <>
      {user && (
        <Box>
          <Box
            sx={{
              alignItems: "center",
              textAlign: "center",
              marginLeft: "-16px",
            }}
          >
            <Tooltip title="Account ">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.firstname[0]} {user.lastname[0]}
                </Avatar>
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
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
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
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
                backgroundColor: theme.colors.itemBackground,
                borderRadius: "10px",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Avatar>
                {user.firstname[0]} {user.lastname[0]}
              </Avatar>{" "}
              {user.firstname} {user.lastname}
            </MenuItem>
            <Divider />
            <MenuItem
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={themeHandleClick}
            >
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
              Theme
            </MenuItem>
            <MenuItem
              onClick={() => {
                signoutHandler();
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          <Menu
            id="basic-menu"
            anchorEl={themeAnchor}
            open={themeOpen}
            onClose={themeHandleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                backgroundColor: theme.colors.itemBackground,
                borderRadius: "10px",
                marginLeft: "20px",
              },
            }}
            transformOrigin={{ horizontal: "left", vertical: "bottom" }}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                changeTheme("dark-mode");
                themeHandleClose();
              }}
            >
              {" "}
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>{" "}
              Dark Mode
            </MenuItem>
            <MenuItem
              onClick={() => {
                changeTheme("light-mode");
                themeHandleClose();
              }}
            >
              {" "}
              <ListItemIcon>
                <LightModeIcon />
              </ListItemIcon>
              Light Mode
            </MenuItem>
            <MenuItem
              onClick={() => {
                changeTheme("system-mode");
                themeHandleClose();
              }}
            >
              {" "}
              <ListItemIcon>
                <SettingsBrightnessIcon />
              </ListItemIcon>{" "}
              System
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
}
