import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import { makeStyles } from "@mui/styles";
import { TextField, Typography } from "@mui/material";
import { createNewSubProject } from "../../../services/projects";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import Checkbox from "@mui/material/Checkbox";
import { addSubProjectId } from "../../../Redux/slices/projects";

export default function NewSubProject({ project }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      {project && (
        <React.Fragment>
          <Button
            sx={{
              width: "98%",
              marginLeft: 0.3,
              textTransform: "none",
            }}
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleClickOpen}
          >
            New Sub Project
          </Button>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Add a sub project for {project.title}</DialogTitle>
            <SubProjectForm project={project} handleClose={handleClose} />
          </Dialog>
        </React.Fragment>
      )}
    </>
  );
}

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
  },
}));
function SubProjectForm({ project, handleClose }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    title: "",
    description: "",
  });
  const [creatingSubProject, setCreatingSubProject] = React.useState(false);
  const userStore = useSelector((state) => state.user);
  const user = userStore.user;
  const token = user ? user.token : null;
  const router = useRouter();
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCreatingSubProject(true);
    const response = await createNewSubProject(
      token,
      // Title
      values.title,
      // Description
      values.description,
      // Project ID
      project.id,
      // Options
      {
        all: checked,
        // Member
        member: checked[0],
        // Manager
        manager: checked[1],
      }
    );
    if (response) {
      console.log(response);
      dispatch(
        addSubProjectId({
          projectId: project.id,
          subProject: response,
        })
      );
      router.push(`/projects/${project.id}/${response.id}`);
      handleClose();
    }
  };

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="sub-project-title"
        label="Sub Project Title"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        color="secondary"
        value={values.title}
        onChange={handleChange("title")}
      />
      <TextField
        id="sub-project-description"
        label="Sub Project Description"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
        color="secondary"
        value={values.description}
        onChange={handleChange("description")}
      />
      {/* Small Typography for a long paragraph */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // alignContent: "center",
          // justifyContent: "center",
          width: "100%",
          padding: 2,
        }}
      >
        <IndeterminateCheckbox
          checked={checked}
          handleChange1={handleChange1}
          handleChange2={handleChange2}
          handleChange3={handleChange3}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: 2,
        }}
      >
        <Typography variant="caption" display="block" gutterBottom>
          Sub-projects improve organization, visibility, and success of a
          project by breaking it down into manageable parts, increasing
          efficiency and facilitating collaboration.
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        {" "}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        {creatingSubProject ? (
          <LoadingButton
            loading
            loadingPosition="start"
            className={classes.button}
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            Adding
          </LoadingButton>
        ) : (
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Add
          </Button>
        )}
      </Box>
    </form>
  );
}

function IndeterminateCheckbox({
  handleChange1,
  handleChange2,
  handleChange3,
  checked,
}) {
  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="Add me as a member"
        control={
          <Checkbox
            checked={checked[0]}
            onChange={handleChange2}
            color="secondary"
          />
        }
      />
      <FormControlLabel
        label="Add me as a manager"
        control={
          <Checkbox
            checked={checked[1]}
            onChange={handleChange3}
            color="secondary"
          />
        }
      />
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="All"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
            color="secondary"
          />
        }
      />
      {children}
    </div>
  );
}
