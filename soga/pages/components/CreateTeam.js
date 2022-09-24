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
import CircularProgress from "@mui/material/CircularProgress";

import {
  Autocomplete,
  Avatar,
  Checkbox,
  Paper,
  TextField,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useGetFriends } from "../../hooks/hooks";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const CreateTeam = ({ toggleShowTeam }) => {
  const theme = useTheme();
  const friends = useGetFriends();
  const [number, setNumber] = useState(1);

  // Step 1
  const [teamName, setTeamName] = useState(null);
  const [isPrivate, setIsPrivate] = useState(null);

  // Step 2
  const [teamMission, setTeamMission] = useState(null);
  const [teamVission, setTeamVission] = useState(null);

  // Step 3
  const [selectedFriends, setSelectedFriends] = useState(null);

  // Step 1 Change Handlers
  const teamNameChangeHandler = (event) => {
    setTeamName(event.target.value);
  };

  const isPrivateChangeHandle = (event) => {
    setIsPrivate(event.target.value);
  };

  // Step 2 Change Handler
  const teamMissionChangeHandler = (event) => {
    setTeamMission(event.target.value);
  };

  const teamVissionChangeHandler = (event) => {
    setTeamVission(event.target.value);
  };

  // Step 3 Change Handler
  const selectedFriendsChangeHandler = (event) => {
    
  };

  const numberHandle = () => {
    setNumber((prev) => prev + 1);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={true}
        onClose={toggleShowTeam}
        TransitionComponent={Transition}
      >
        <IconButton
          color="error"
          onClick={() => {
            toggleShowTeam();
          }}
          aria-label="close"
          sx={{
            position: "absolute",
            top: "5px",
            right: "5px",
            backgroundColor: theme.colors.itemBackground,
            "&:hover": {
              backgroundColor: theme.colors.background2,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* Body */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: theme.colors.background,
            height: "100vh",
            width: "100vw",
            margin: "0px",
            padding: "50px",
          }}
        >
          {/* Left */}
          <Box
            sx={{
              paddingTop: "40px",
            }}
          >
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
            <Steps number={number} />
            <BodyRight
              number={number}
              numberHandle={numberHandle}
              friends={friends}
            />
          </Paper>
        </Box>
      </Dialog>
    </div>
  );
};
CreateTeam.propTypes = {};

export default CreateTeam;

const BodyRight = ({ number, friends, numberHandle }) => {
  switch (number) {
    case 1:
      return <TeamNamingForm numberHandle={numberHandle} />;
    case 2:
      return <TeamMissionVission numberHandle={numberHandle} />;
    case 3:
      return <AddPeopleInTeam friends={friends} numberHandle={numberHandle} />;
    default:
      <TeamNamingForm numberHandle={numberHandle} />;
  }
};

const TeamNamingForm = ({ numberHandle }) => {
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
      <Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: "10px",
          }}
          onClick={() => {
            numberHandle();
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

const TeamMissionVission = ({ numberHandle }) => {
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
          onClick={() => {
            numberHandle();
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

const AddPeopleInTeam = ({ friends }) => {
  return (
    <Box>
      {" "}
      <Typography variant="h5">Invite your Team members</Typography>
      <br />
      <Box
        sx={{
          height: "320px",
          display: "block",
        }}
      >
        {friends ? (
          <>
            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={friends}
              getOptionLabel={(person) => <PersonOption person={person} />}
              defaultValue={[friends[0]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Friends"
                  placeholder="Search a friend"
                />
              )}
              sx={{ width: "auto", maxHeight: "200px" }}
            />
          </>
        ) : (
          <Box
            sx={{
              // marginTop: "100px",
              // marginLeft: "130px",
              padding: "145px",
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>
      <br />
      {friends && (
        <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: "10px",
          }}
        >
          Create
        </Button>
      )}
    </Box>
  );
};

const Steps = ({ number }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "fit-content",
        margin: "10px",
        gap: "10px",
      }}
    >
      <Step number={1} passed={number < 1 ? false : true} />
      <Step number={2} passed={number < 2 ? false : true} />
      <Step number={3} passed={number < 3 ? false : true} />
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

const PersonOption = ({ person }) => {
  return (
    <Box sx={{ display: "flex", gap: "15px" }}>
      <Avatar sx={{ height: "20px", width: "20px" }} />
      {person.username}
    </Box>
  );
};
