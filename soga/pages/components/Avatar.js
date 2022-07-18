import * as React from "react";
import { makeStyles } from "@mui/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import "@fontsource/open-sans/500.css"; // Weight 500.

const useStyles = makeStyles({
  iconButton: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  
});

export default function BadgeAvatars({triggerFileSelectPopup}) {
  const classes = useStyles();
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <IconButton
                    className={classes.iconButton}
                    {...bindTrigger(popupState)}
                  >
                    <CameraAltIcon />
                  </IconButton>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>View</MenuItem>
                    <MenuItem onClick={()=>{
                        popupState.close;
                        triggerFileSelectPopup()
                    }}>Upload</MenuItem>
                    <MenuItem onClick={popupState.close}>Remove</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          }
        >
          <Avatar alt="Travis Howard" sx={{ width: 100, height: 100 }} />
        </Badge>
      </Stack>
    </>
  );
}
function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained">Dashboard</Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={popupState.close}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
