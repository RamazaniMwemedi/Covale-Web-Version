import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import {
  Autocomplete,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { createNewProject } from "../../../services/projects";
import { addProject } from "../../../Redux/slices/projects";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
  },
}));
export default function NewProject() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        sx={{
          position: "absolute",
          bottom: 8,
          width: "90%",
          marginLeft: 0.3,
          textTransform: "none",
          ml: 2,
        }}
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        New Project
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        sx={{
          position: "absolute",
          bottom: 8,
          width: "100%",
          height: "100%",
          textTransform: "none",
          backgroundColor: theme.colors.textBackground2,
          //   Blur
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderRadius: "10px",
        }}
      >
        <DialogTitle>Create a Project </DialogTitle>
        <DialogContent>
          <ProjectForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

function ProjectForm({ handleClose }) {
  const classes = useStyles();
  const [projectName, setProjectName] = React.useState("");
  const [projectDescription, setProjectDescription] = React.useState("");
  // Error
  const [projectNameError, setProjectNameError] = React.useState(false);
  const [projectDescriptionError, setProjectDescriptionError] =
    React.useState(false);

  // Share with team
  const [shareWithTeam, setShareWithTeam] = React.useState(false);
  const [teamId, setTeamId] = React.useState([]);
  // Task Status
  const [taskStatus, setTaskStatus] = React.useState([]);
  // Defualt Task Status
  // First task status
  const [defaultTaskStatus, setDefaultTaskStatus] =
    React.useState("In Progress");
  // Last task status
  const [lastTaskStatus, setLastTaskStatus] = React.useState("Completed");

  const [creating, setCreating] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  //   Loged in user token from redux
  const userStore = useSelector((state) => state.user);
  const user = userStore.user ? userStore.user : null;
  const token = userStore ? userStore.user.token : null;
  //  Team list from redux
  const teamStore = useSelector((state) => state.teams);
  const teamList = teamStore ? teamStore.teams : null;

  const teamChangeHandler = (value) => {
    // Add only ids to teamId

    setTeamId(value.map((team) => team.id));
  };

  // subprojectName,
  // subprojectDescription,
  // onSubprojectNameChange,
  // onSubprojectDescriptionChange,
  // subProjectNameError,
  // subProjectDescriptionError,
  const [subprojectName, setSubprojectName] = React.useState("");
  const [subprojectDescription, setSubprojectDescription] = React.useState("");
  const [subProjectNameError, setSubProjectNameError] = React.useState(false);
  const [subProjectDescriptionError, setSubProjectDescriptionError] =
    React.useState(false);
  const [subProjctError, setSubProjctError] = React.useState(false);
  const [subProjects, setSubProjects] = React.useState([]);
  const onSubprojectNameChange = (e) => {
    setSubprojectName(e.target.value);
  };
  const onSubprojectDescriptionChange = (e) => {
    setSubprojectDescription(e.target.value);
  };

  const AddSubprojectHandler = () => {
    if (subprojectName === "") {
      setSubProjectNameError(true);
    } else {
      setSubProjectNameError(false);
    }
    if (subprojectDescription === "") {
      setSubProjectDescriptionError(true);
    } else {
      setSubProjectDescriptionError(false);
    }

    if (subprojectName !== "" && subprojectDescription !== "") {
      setSubProjects([
        ...subProjects,
        {
          name: subprojectName,
          description: subprojectDescription,
        },
      ]);
      setSubprojectName("");
      setSubprojectDescription("");
    }
  };

  const DeleteSubprojectHandler = (index) => {
    setSubProjects((prev) => prev.filter((_, i) => i !== index));
  };

  // Step 1:
  const [step1, setStep1] = React.useState(true);
  // Step 2:
  const [step2, setStep2] = React.useState(false);
  // Step 3:
  const [step3, setStep3] = React.useState(false);
  // Step 4:
  const [step4, setStep4] = React.useState(false);

  // Value State Handler
  const onProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const onProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const onShareWithTeamChange = (e) => {
    setShareWithTeam(e.target.checked);
  };

  const onTeamIdChange = (e) => {
    setTeamId(e.target.value);
  };

  const onTaskStatusChange = (e) => {
    setTaskStatus(e.target.value);
  };

  const onDefaultTaskStatusChange = (e) => {
    setDefaultTaskStatus(e.target.value);
  };

  const onLastTaskStatusChange = (e) => {
    setLastTaskStatus(e.target.value);
  };

  //   Next Step Handler
  const nextStep1 = () => {
    //  Check if project name and description is empty
    if (projectName === "") {
      setProjectNameError(true);

      setTimeout(() => {
        setProjectNameError(false);
      }, 2000);

      return;
    }

    if (projectDescription === "") {
      setProjectDescriptionError(true);

      setTimeout(() => {
        setProjectDescriptionError(false);
      }, 2000);

      return;
    }

    setStep1(false);
    setStep2(true);
  };

  const nextStep2 = () => {
    setStep2(false);
    setStep3(true);
  };

  const nextStep3 = () => {
    if (subProjects.length === 0) {
      setSubProjctError(true);
      setTimeout(() => {
        setSubProjctError(false);
      }, 2000);
      return;
    }
    setStep3(false);
    setStep4(true);
  };

  //   Create Project Function
  const createProject = async () => {
    setCreating(true);
    const project = {
      name: projectName,
      description: projectDescription,
      teamId,
      subProjects,
    };

    const res = await createNewProject(project, token);
    if (res.error) {
      setCreating(false);
    } else {
      setCreating(false);
      dispatch(addProject(res));
      router.push(`/projects/${res.id}`);
      setCreating(false);
      handleClose();
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <HorizontalLabelPositionBelowStepper
        activeStep={step1 ? 0 : step2 ? 1 : step3 ? 2 : step4 ? 3 : 0}
      />
      {step1 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ProjectDetails
            onProjectNameChange={onProjectNameChange}
            onProjectDescriptionChange={onProjectDescriptionChange}
            projectName={projectName}
            projectDescription={projectDescription}
            projectNameError={projectNameError}
            projectDescriptionError={projectDescriptionError}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            sx={{
              alignSelf: "flex-end",
            }}
            onClick={nextStep1}
          >
            Next
          </Button>
        </Box>
      )}
      {step2 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <ShareWithTeam
            onShareWithTeamChange={onShareWithTeamChange}
            onTeamIdChange={onTeamIdChange}
            shareWithTeam={shareWithTeam}
            teamId={teamId}
            teamList={teamList}
            teamChangeHandler={teamChangeHandler}
            user={user}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Back  */}
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => {
                setStep1(true);
                setStep2(false);
              }}
            >
              Back
            </Button>
            {/* Next */}

            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={nextStep2}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      {step3 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "space-between",
              maxHeight: "200px",
              overflowY: "scroll",
              p: 1,
            }}
          >
            {subProjects.length > 0 ? (
              subProjects.map((subProject, index) => {
                return (
                  <SubProjectCard
                    key={index}
                    index={index}
                    subProject={subProject}
                    DeleteSubprojectHandler={DeleteSubprojectHandler}
                  />
                );
              })
            ) : (
              <Typography
                sx={{
                  alignSelf: "center",
                }}
                variant="h6"
                color="text.secondary"
                component="p"
              >
                No Subproject Added Yet
              </Typography>
            )}
          </Box>
          <AddSubproject
            onSubprojectNameChange={onSubprojectNameChange}
            onSubprojectDescriptionChange={onSubprojectDescriptionChange}
            subprojectName={subprojectName}
            subprojectDescription={subprojectDescription}
            subProjectNameError={subProjectNameError}
            subProjectDescriptionError={subProjectDescriptionError}
            AddSubprojectHandler={AddSubprojectHandler}
            subProjctError={subProjctError}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Back  */}
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => {
                setStep2(true);
                setStep3(false);
              }}
            >
              Back
            </Button>
            {/* Next */}
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={nextStep3}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
      {step4 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ReviewAndCreateProject
            projectName={projectName}
            projectDescription={projectDescription}
            subProjectList={subProjects}
            shareWithTeam={shareWithTeam}
            teamList={teamList}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Back  */}
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => {
                setStep3(true);
                setStep4(false);
              }}
            >
              Back
            </Button>
            {/* Next */}
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={createProject}
            >
              Create Project
            </Button>
          </Box>
        </Box>
      )}

      {/* <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        {creating ? (
          <LoadingButton
            loading
            loadingPosition="start"
            className={classes.button}
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            Creating
          </LoadingButton>
        ) : (
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={createProject}
          >
            Create
          </Button>
        )}
      </Box> */}
    </form>
  );
}
function HorizontalLabelPositionBelowStepper({ activeStep }) {
  const steps = [
    "Project Details",
    "Share with team",
    "Sub Project",
    "Review & Create",
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ color: "#8A2BE2" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

// Project Details Component
function ProjectDetails({
  projectName,
  projectDescription,
  onProjectNameChange,
  onProjectDescriptionChange,
  projectNameError,
  projectDescriptionError,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <TextField
        id="project-name"
        label="Project Name"
        margin="normal"
        variant="outlined"
        color="secondary"
        value={projectName}
        onChange={onProjectNameChange}
        error={projectNameError}
        helperText={projectNameError && "Project name is required"}
      />

      <TextField
        id="project-description"
        label="Project Description"
        // className={classes.textField}
        margin="normal"
        variant="outlined"
        color="secondary"
        multiline
        rows={4}
        value={projectDescription}
        onChange={onProjectDescriptionChange}
        error={projectDescriptionError}
        helperText={
          projectDescriptionError && "Project description is required"
        }
      />
    </Box>
  );
}

// Prioritizing if project is shared with team or not
function ShareWithTeam({
  shareWithTeam,
  onShareWithTeamChange,
  teamList,
  teamChangeHandler,
  user,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <FormControlLabel
          value="start"
          control={
            <Switch
              checked={shareWithTeam}
              onChange={onShareWithTeamChange}
              inputProps={{ "aria-label": "controlled" }}
              color="secondary"
            />
          }
          label="Share with team"
          labelPlacement="start"
        />
        {shareWithTeam && (
          <AddTeam
            teams={teamList}
            user={user}
            teamChangeHandler={teamChangeHandler}
          />
        )}
        {!shareWithTeam && (
          <Typography variant="body2" color="#0d47a1">
            You can share this project with your team later
          </Typography>
        )}
        {shareWithTeam && (
          <Typography variant="body2" color="#0d47a1">
            You can change this later
          </Typography>
        )}
      </Box>
    </Box>
  );
}

const AddTeam = ({ teams, teamChangeHandler, user }) => {
  // Filter teams which user is in the directors array
  const filteredTeams = teams.filter((team) => {
    return team.directors.map((director) => director._id).includes(user._id);
  });
  return (
    <Box>
      {" "}
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={teams}
        getOptionLabel={(team) => `${team.teamName} `}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Teams"
            placeholder="Search a team"
            color="secondary"
            size="small"
          />
        )}
        sx={{ width: "400px", maxHeight: "200px" }}
        onChange={(event, value) => teamChangeHandler(value)}
      />
    </Box>
  );
};

// Add Subproject Component
function AddSubproject({
  subprojectName,
  subprojectDescription,
  onSubprojectNameChange,
  onSubprojectDescriptionChange,
  subProjectNameError,
  subProjectDescriptionError,
  subProjctError,
  AddSubprojectHandler,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <TextField
        id="subproject-name"
        label="Subproject Name *"
        margin="normal"
        variant="outlined"
        color="secondary"
        value={subprojectName}
        onChange={onSubprojectNameChange}
        error={subProjectNameError}
        helperText={subProjectNameError && "Project name is required"}
      />

      <TextField
        id="subproject-description"
        label="Subproject Description *"
        margin="normal"
        variant="outlined"
        color="secondary"
        multiline
        rows={4}
        sx={{
          width: "100%",
        }}
        value={subprojectDescription}
        onChange={onSubprojectDescriptionChange}
        error={subProjectDescriptionError}
        helperText={
          subProjectDescriptionError && "Project description is required"
        }
      />
      <br />
      {subProjctError && (
        <Typography variant="body2" color="error">
          Please add atleast one subproject
        </Typography>
      )}
      <br />

      <Button
        variant="contained"
        color="secondary"
        onClick={AddSubprojectHandler}
        sx={{
          textTransform: "none",
          width: "30%",
        }}
      >
        Add Subproject
      </Button>
      {/*  */}
      <Typography
        variant="caption"
        sx={{
          p: 1,
        }}
      >
        Add a subproject to break down your project into smaller, more
        manageable parts. This will help you stay organized and on top of your
        tasks.
        <br />
        <br />
        <b>Example:</b> if your project is to plan a party, you could create a
        subproject for each part of the party planning process such as
        invitations, decorations, food and drinks, and entertainment. This way,
        you can easily keep track of each part of the planning process and
        ensure nothing is overlooked.
      </Typography>
    </Box>
  );
}

// SubProjectCard
function SubProjectCard({ subProject, index, DeleteSubprojectHandler }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        p: 1,
        border: `1px solid ${theme.colors.textBackground}`,
        borderRadius: "5px",
        //shadow
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
      }}
    >
      <Box>
        <Typography variant="subtitle2">{subProject.name}</Typography>
        <Typography variant="body2">{subProject.description}</Typography>
      </Box>
      <IconButton
        sx={{
          ml: "auto",
        }}
      >
        <RemoveRoundedIcon
          onClick={() => DeleteSubprojectHandler(index)}
          color="error"
        />
      </IconButton>
    </Box>
  );
}

// Review and Create Project
function ReviewAndCreateProject({
  projectName,
  projectDescription,
  subProjectList,
  shareWithTeam,
  teamList,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        p: 1,
      }}
    >
      <Typography variant="subtitle1">Project Name</Typography>
      <Typography variant="body2">{projectName}</Typography>
      <br />
      <Typography variant="subtitle1">Project Description</Typography>
      <Typography variant="body2">{projectDescription}</Typography>
      <br />
      <Typography variant="subtitle1">Subprojects</Typography>
      {subProjectList.map((subProject, index) => (
        <Typography variant="body2" key={index}>
          {subProject.name}
        </Typography>
      ))}
      <br />
      <Typography variant="subtitle1">Share with team</Typography>
      <Typography variant="body2">{shareWithTeam ? "Yes" : "No"}</Typography>
      <br />
      {shareWithTeam && (
        <Box>
          <Typography variant="subtitle1">Team</Typography>
          {teamList.map((team, index) => (
            <Typography variant="body2" key={index}>
              {team.teamName}
            </Typography>
          ))}
        </Box>
      )}
      <br />

      <br />
    </Box>
  );
}
