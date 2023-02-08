import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { TextField } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { createNewProject } from "../../../services/projects";
import { addProject } from "../../../Redux/slices/projects";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

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
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
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
          position: "fixed",
          bottom: 8,
          width: "20%",
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
        fullWidth={fullWidth}
        maxWidth={maxWidth}
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
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
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
  const [creating, setCreating] = React.useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  //   Loged in user token from redux
  const userStore = useSelector((state) => state.user);
  const token = userStore ? userStore.user.token : null;

  //   Create Project Function
  const createProject = async () => {
    setCreating(true);
    const respose = await createNewProject(
      token,
      projectName,
      projectDescription
    );
    if (respose) {
      console.log(respose);
      dispatch(addProject(respose));
      router.push(`/projects/${respose.id}`);
      setCreating(false);
      handleClose();
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="project-name"
        label="Project Name"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        color="secondary"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <TextField
        id="project-description"
        label="Project Description"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        color="secondary"
        multiline
        rows={4}
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
      />
      <Box
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
      </Box>
    </form>
  );
}
