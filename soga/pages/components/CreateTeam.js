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
import { lightBlue, purple } from "@mui/material/colors";

import { Checkbox, Paper, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const CreateTeam = ({ toggleShowTeam }) => {
  const theme = useTheme();
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: theme.colors.background,
            height: "100vh",
            width: "100vw",
            margin: "0px",
            padding: "20px",
          }}
        >
          {/* Left */}
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: "90px",
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
          <Paper
            sx={{
              height: "550px",
              width: "400px",
              borderRadius: "10px",
              marginRight: "50px",
              padding: "35px",
            }}
            elevation={3}
          >
            <Box
              sx={{
                display: "flex",
                width: "fit-content",
                margin: "10px",
                gap: "10px",
              }}
            >
              <Step number={1} passed={true} />
              <Step number={2} passed={false} />
              <Step number={3} passed={false} />
              <Step number={4} passed={false} />
            </Box>
            <TeamMissionVission />
          </Paper>
        </Box>
      </Dialog>
    </div>
  );
};
CreateTeam.propTypes = {};

export default CreateTeam;

const TeamNamingForm = ({ teamNameChangeHAndler }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Box>
      <Typography variant="h6">How would you like to name your team</Typography>
      <br />
      <TextField
        id="outlined-basic"
        color="secondary"
        label="Team Name"
        variant="outlined"
        sx={{
          borderRadius: "10px",
        }}
      />
      <br />
      <br />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Would you like it to be private ?</Typography>
        <Checkbox {...label} defaultChecked color="secondary" />
      </Box>
      <br />
      <Typography variant="subtitle2">
        By Private, we mean it won't be visible by people whom are not members
        or not invited
      </Typography>
      <br />
      <br />
      <Box sx={{}}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: "10px",
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

const TeamMissionVission = () => {
  return (
    <Box>
      <Typography variant="h5">
        A greate Team deserve Mission and Vission
      </Typography>
      <br />
      <Typography variant="h6">What is your Team Mission </Typography>
      <TextField
        id="outlined-basic"
        color="secondary"
        label="Team Mission"
        variant="outlined"
        sx={{
          borderRadius: "10px",
        }}
      />
      <br />
      <br />
      <Typography variant="h6">What is your Team Vission </Typography>
      <TextField
        id="outlined-basic"
        color="secondary"
        label="Team Vission"
        variant="outlined"
        sx={{
          borderRadius: "10px",
        }}
      />
      <br />
      <br />
      <Typography variant="subtitle2">
        The Team Mission and Vission will be display in your Team so to motivate
        your Team members. You may skip if you aren't ready now.
      </Typography>
      <br />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "10px",
          }}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: "10px",
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

const Step = ({ number, passed }) => {
  return (
    <Box
      sx={{
        backgroundColor: passed ? "#ab47bc" : "#e91e63",
        borderRadius: "30px",
        padding: "5px",
        paddingLeft: "10px",
        color: "white",
        width: 30,
        height: 30,
      }}
    >
      <Typography>{number}</Typography>
    </Box>
  );
};
