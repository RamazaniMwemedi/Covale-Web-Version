import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const CreateTeam = ({ toggleShowTeam }) => {
  return (
    <div>
      <Dialog
        fullScreen
        open={true}
        onClose={toggleShowTeam}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Your Greate Team
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleShowTeam}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* Body */}
        <Box>
          {/* Left */}
          <Box
            sx={{
              padding: "30px",
              paddingTop: "80px",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: "90px",
                color: "linear-gradient(-90deg, red, yellow)",
              }}
            >
              <span className="animated">Create New</span>
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: "90px",
              }}
            >
              <span className="animated1">Awsome and</span>
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: "90px",
              }}
            >
              <span className="animated2">Productive</span>
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: "90px",
              }}
            >
              <span className="animated3">Team</span>
            </Typography>
          </Box>
          {/* Right */}
          <Box></Box>
        </Box>
      </Dialog>
    </div>
  );
};
CreateTeam.propTypes = {};

export default CreateTeam;
