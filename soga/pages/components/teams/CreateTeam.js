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
import { useTheme } from "@mui/material/styles";
import {
  Autocomplete,
  Avatar,
  Checkbox,
  Paper,
  TextField,
} from "@mui/material";
import { useGetFriends, useCheckLogedinUserToken } from "../../../hooks/hooks";
import { createNewTeam, inviteFriends } from "../../../services/teams";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const CreateTeam = ({ toggleShowTeam }) => {
  const theme = useTheme();
  const router = useRouter();
  const friends = useGetFriends();
  const token = useCheckLogedinUserToken();
  const [number, setNumber] = useState(1);
  // New Team
  const [createdTeamId, setCreatedTeamId] = useState("");

  // Step 1
  const [teamName, setTeamName] = useState("");
  const [teamNameErrorMessage, setTeamNameErrorMessage] = useState("");
  const [teamNameErrorBoolean, setTeamNameErrorBoolean] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  // Step 2
  const [teamMission, setTeamMission] = useState("");
  const [teamVission, setTeamVission] = useState("");
  const [creatingTeamBool, setCreatingTeamBool] = useState(false);

  // Step 3
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [invitingBool, setInvitingBool] = useState(false);

  // Step 1 Change Handlers
  const teamNameChangeHandler = (event) => {
    setTeamName(event.target.value);
  };

  const isPrivateChangeHandle = (event) => {
    setIsPrivate((prev) => !prev);
  };

  // Step 2 Change Handler
  const teamMissionChangeHandler = (event) => {
    setTeamMission(event.target.value);
  };

  const teamVissionChangeHandler = (event) => {
    setTeamVission(event.target.value);
  };

  // Step 3 Change Handler
  const selectedFriendsChangeHandler = (values) => {
    const friendsIds = values.map((value) => {
      return value.id;
    });
    setSelectedFriends(friendsIds);
  };

  // Next Steps Handlers
  // Step 1
  const stepOneNextHanlder = () => {
    if (teamName.length < 1) {
      setTeamNameErrorMessage("Team name can't be empty");
      setTeamNameErrorBoolean(true);
      setTimeout(() => {
        setTeamNameErrorBoolean(false);
        setTeamNameErrorMessage("");
      }, 3000);
    } else {
      setNumber((prev) => prev + 1);
    }
  };

  const sendInvitation = async () => {
    if (token && selectedFriends.length > 0 && createdTeamId) {
      setInvitingBool(true);
      const res = await inviteFriends(token, createdTeamId, selectedFriends);
      if (res == 200 && createdTeamId) {
        setInvitingBool(false);
        router.push(`/chats/t/${createdTeamId}`);
      }
    }
  };

  const createTeam = async () => {
    if (token) {
      setCreatingTeamBool(true);
      const response = await createNewTeam(
        token,
        teamName,
        isPrivate,
        teamMission,
        teamVission
      );
      if (typeof response == "string") {
        setCreatingTeamBool(false);
        setCreatedTeamId(response);
        setNumber((prev) => prev + 1);
      }
    }
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
              stepOneNextHanlder={stepOneNextHanlder}
              friends={friends}
              // Steps
              // Step 1
              teamName={teamName}
              isPrivate={isPrivate}
              teamNameErrorMessage={teamNameErrorMessage}
              teamNameErrorBoolean={teamNameErrorBoolean}
              // Step 2
              teamMission={teamMission}
              teamVission={teamVission}
              creatingTeamBool={creatingTeamBool}
              // Step 3
              selectedFriends={selectedFriends}
              // Steps
              // Step 1 Change Handlers
              teamNameChangeHandler={teamNameChangeHandler}
              isPrivateChangeHandle={isPrivateChangeHandle}
              // Step 2 Change Handlers
              teamMissionChangeHandler={teamMissionChangeHandler}
              teamVissionChangeHandler={teamVissionChangeHandler}
              // Step 3 Change Handler
              selectedFriendsChangeHandler={selectedFriendsChangeHandler}
              sendInvitation={sendInvitation}
              // Create Net Team handler
              createTeam={createTeam}
              invitingBool={invitingBool}
              createdTeamId={createdTeamId}
            />
          </Paper>
        </Box>
      </Dialog>
    </div>
  );
};

CreateTeam.propTypes = {};

export default CreateTeam;

const BodyRight = ({
  number,
  friends,
  stepOneNextHanlder,
  teamName,
  isPrivate,
  teamNameErrorMessage,
  teamNameErrorBoolean,
  teamMission,
  teamVission,
  creatingTeamBool,
  selectedFriends,
  teamNameChangeHandler,
  isPrivateChangeHandle,
  teamMissionChangeHandler,
  teamVissionChangeHandler,
  selectedFriendsChangeHandler,
  sendInvitation,
  invitingBool,
  createTeam,
  createdTeamId,
}) => {
  switch (number) {
    case 1:
      return (
        <TeamNamingForm
          stepOneNextHanlder={stepOneNextHanlder}
          teamName={teamName}
          isPrivate={isPrivate}
          teamNameErrorMessage={teamNameErrorMessage}
          teamNameErrorBoolean={teamNameErrorBoolean}
          teamNameChangeHandler={teamNameChangeHandler}
          isPrivateChangeHandle={isPrivateChangeHandle}
        />
      );
    case 2:
      return (
        <TeamMissionVission
          teamMission={teamMission}
          teamVission={teamVission}
          teamMissionChangeHandler={teamMissionChangeHandler}
          teamVissionChangeHandler={teamVissionChangeHandler}
          creatingTeamBool={creatingTeamBool}
          createTeam={createTeam}
        />
      );
    case 3:
      return (
        <AddPeopleInTeam
          friends={friends}
          selectedFriends={selectedFriends}
          selectedFriendsChangeHandler={selectedFriendsChangeHandler}
          sendInvitation={sendInvitation}
          invitingBool={invitingBool}
          createdTeamId={createdTeamId}
        />
      );
    default:
      <TeamMissionVission
        teamMission={teamMission}
        teamVission={teamVission}
        teamMissionChangeHandler={teamMissionChangeHandler}
        teamVissionChangeHandler={teamVissionChangeHandler}
      />;
  }
};

const TeamNamingForm = ({
  stepOneNextHanlder,
  teamName,
  teamNameErrorMessage,
  teamNameErrorBoolean,
  isPrivate,
  teamNameChangeHandler,
  isPrivateChangeHandle,
}) => {
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
        value={teamName}
        helperText={teamNameErrorMessage}
        error={teamNameErrorBoolean}
        onChange={(e) => {
          teamNameChangeHandler(e);
        }}
        sx={{
          borderRadius: "10px",
        }}
      />
      <br />
      <br />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Would you like it to be private ?</Typography>
        <Checkbox
          {...label}
          value={isPrivate}
          onChange={() => {
            isPrivateChangeHandle();
          }}
          // defaultChecked
          color="secondary"
        />
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
            stepOneNextHanlder();
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

const TeamMissionVission = ({
  teamMission,
  teamVission,
  creatingTeamBool,
  teamMissionChangeHandler,
  teamVissionChangeHandler,
  createTeam,
}) => {
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
        value={teamMission}
        onChange={(e) => {
          teamMissionChangeHandler(e);
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
        value={teamVission}
        onChange={(e) => {
          teamVissionChangeHandler(e);
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
        {creatingTeamBool ? (
          <LoadingButton
            loading
            startIcon={<SaveIcon />}
            loadingPosition="start"
            variant="contained"
          >
            Creating
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: "10px",
            }}
            onClick={() => {
              // Creacte account junction
              createTeam();
            }}
          >
            Create
          </Button>
        )}
      </Box>
    </Box>
  );
};

const AddPeopleInTeam = ({
  friends,
  selectedFriends,
  selectedFriendsChangeHandler,
  sendInvitation,
  invitingBool,
  createdTeamId,
}) => {
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
              getOptionLabel={
                (person) => `${person.firstname} ${person.lastname}`
                // <PersonOption person={person} />
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Friends"
                  placeholder="Search a friend"
                />
              )}
              sx={{ width: "auto", maxHeight: "200px" }}
              onChange={(event, value) => selectedFriendsChangeHandler(value)}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {friends &&
          (invitingBool ? (
            <LoadingButton
              loading
              startIcon={<SaveIcon />}
              loadingPosition="start"
              variant="contained"
            >
              Inviting
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: "10px",
              }}
              onClick={() => {
                sendInvitation();
              }}
            >
              Invite
            </Button>
          ))}
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "10px",
          }}
          onClick={() => {
            window.location.href = `http://localhost:3000/chats/t/${createdTeamId}`;
          }}
        >
          Skip
        </Button>
      </Box>
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
