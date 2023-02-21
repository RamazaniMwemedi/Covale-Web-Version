import * as React from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  AvatarGroup,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { useTheme } from "@mui/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import { useDispatch } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import { addTaskToSubProject } from "../../../../Redux/slices/projects";
import FileIcone from "../../mediaFiles/FileIcon";

const KanbanView = ({
  project: { members },
  subProject: { tasks, id, project, title },
  taskStatus,
}) => {
  const dispatch = useDispatch();
  // Add tasks handlers
  // Add Pending tasks handlers
  const addTheTaskToReduxHandler = (task) => {
    dispatch(
      addTaskToSubProject({
        projectId: project,
        subProjectId: id,
        task,
      })
    );
  };
  return (
    <Box sx={{ width: "300px" }}>
      <Typography variant="h6">{title}</Typography>
      <TaskStates
        tasks={tasks}
        taskStatus={taskStatus}
        addTheTaskToReduxHandler={addTheTaskToReduxHandler}
        members={members}
      />
    </Box>
  );
};

export default KanbanView;

function TaskStates({ tasks, taskStatus, addTheTaskToReduxHandler, members }) {
  // Copy the values from the taskStatus to states and add "New State" to the end
  const states = [...taskStatus, "New State"];
  const categorizedTasks = {};

  states.forEach((state) => {
    categorizedTasks[state] = tasks.filter((task) => task.status === state);
  });
  return (
    <Box
      sx={{
        width: "72vw",
        height: "75vh",
        overflowY: "hidden",
        display: "flex",
        backgroundColor: "unset",
      }}
    >
      {states.map((state) => (
        <TaskBlock
          key={state}
          state={state}
          addTheTaskToReduxHandler={addTheTaskToReduxHandler}
          tasks={categorizedTasks[state]}
          members={members}
        />
      ))}
    </Box>
  );
}

const TaskBlock = ({ state, tasks, addTheTaskToReduxHandler, members }) => {
  const theme = useTheme();
  const [addNewTask, setAddNewTask] = React.useState(false);

  const addNewTaskToggleHandler = (state) => {
    if (state !== "New State") {
      setAddNewTask((prev) => !prev);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Top */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: "10px",
          backgroundColor: theme.colors.background,
          width: "300px",
        }}
      >
        <Typography variant="body1">
          {state} {tasks.length > 0 && `(${tasks.length})`}
        </Typography>
        <Button
          sx={{
            width: "100%",
            backgroundColor:
              state === "New State"
                ? theme.palette.secondary.main
                : theme.colors.textBackground,
            color: addNewTask
              ? theme.palette.error.main
              : theme.palette.secondary.main,
          }}
          color="secondary"
          onClick={() => addNewTaskToggleHandler(state)}
        >
          {addNewTask ? (
            <RemoveRoundedIcon
              sx={{
                color:
                  state === "New State" ? "white" : theme.palette.error.main,
              }}
            />
          ) : (
            <AddRoundedIcon
              sx={{
                color:
                  state === "New State"
                    ? "white"
                    : theme.palette.secondary.main,
              }}
            />
          )}
        </Button>
      </Box>
      {/* Scrollable container */}
      {addNewTask && (
        <AddTaskForm
          addTheTaskToReduxHandler={addTheTaskToReduxHandler}
          addNewTaskToggleHandler={addNewTaskToggleHandler}
          state={state}
          members={members}
        />
      )}
      <Box
        sx={{
          maxHeight: "90%",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "10px",
        }}
      >
        {tasks.map((task) => (
          <TaskComponent key={task.title} task={task} />
        ))}
      </Box>
    </Box>
  );
};

const TaskComponent = ({ task }) => {
  const theme = useTheme();

  let flagColor;
  if (task.flag === "High") {
    flagColor = theme.palette.error.main;
  } else if (task.flag === "Medium") {
    flagColor = theme.palette.warning.main;
  } else if (task.flag === "Low") {
    flagColor = theme.palette.success.main;
  }
  return (
    <Box
      sx={{
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: theme.colors.textBackground,
        borderRadius: "10px",
      }}
    >
      {/* Top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Flag */}
        <Tooltip title={task.flag} placement="top" arrow>
          <Box
            sx={{
              width: "12px",
              height: "12px",
              borderRadius: "25%",
              backgroundColor: flagColor,
            }}
          >
            {/* {task.flag && task.flag} */}
          </Box>
        </Tooltip>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
      {/* Task details */}

      <Typography variant="caption">{task.title}</Typography>
      <br />
      <Typography variant="caption">{task.description}</Typography>

      {/* Sub Tasks */}
      {task.subtasks && task.subtasks.length > 0 && (
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label" color="secondary">
            Sub Tasks
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {task.subtasks.map((subtask) => (
              <FormControlLabel
                value={subtask.title}
                control={<Radio size="small" color="secondary" />}
                label={subtask.title}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      <Divider sx={{ margin: "10px 0" }} />
      {/* Add sub task */}
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <IconButton size="small">
          <AddRoundedIcon />
        </IconButton>
        <Typography variant="caption">Add Sub Task</Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      {/* Assignees */}
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AvatarGroup
          total={
            task.assignees && task.assignees.length > 3
              ? task.assignees.length
              : 0
          }
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            "& .MuiAvatar-root": { width: 30, height: 30, fontSize: 10 },
          }}
        >
          {task.assignees &&
            task.assignees.map((assignee) => (
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  fontSize: 10,
                }}
              >
                {assignee.name}
              </Avatar>
            ))}
        </AvatarGroup>
        <Box
          sx={{
            display: "flex",
            gap: "5px",
          }}
        >
          <IconButton size="small">
            <CommentRoundedIcon />
          </IconButton>
          <IconButton size="small">
            <AttachFileRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

// Form for adding new task
const AddTaskForm = ({
  addTheTaskToReduxHandler,
  state,
  addNewTaskToggleHandler,
  members,
}) => {
  const theme = useTheme();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [flag, setFlag] = React.useState("");
  const [assignees, setAssignees] = React.useState([]);

  // Subtask state
  const [subtasks, setSubtasks] = React.useState([]);
  const [showSubtaskForm, setShowSubtaskForm] = React.useState(false);

  // File states
  const [files, setFiles] = React.useState([]);
  const fileInput = React.useRef(null);
  const fileInput2 = React.useRef(null);
  console.log(files);

  // Subtask handlers
  const addSubtaskHandler = (subtask) => {
    // If subtask is an empty string or a space, return
    if (subtask.trim() === "") {
      return;
    }
    // If subtask is already added, remove it
    if (subtasks.includes(subtask)) {
      setSubtasks((prev) => prev.filter((s) => s !== subtask));
      return;
    }

    setSubtasks((prev) => [...prev, subtask]);
  };

  const removeSubtaskHandler = (subtask) => {
    setSubtasks((prev) => prev.filter((s) => s !== subtask));
  };

  const handleChooseFileIcon = (e) => {
    fileInput.current.click();
  };
  const handleChooseFileIcon2 = (e) => {
    fileInput2.current.click();
  };

  const handleChooseFile = (e) => {
    // input change handler
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFiles((prev) => [
        ...prev,
        {
          name: file.name,
          type: file.type,
          size: file.size,
          data: e.target.result,
        },
      ]);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = (file) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  // Assignee handlers
  const addAssigneeHandler = (assignee) => {
    // If assignee is already added, remove it
    if (assignees.includes(assignee)) {
      setAssignees((prev) => prev.filter((a) => a !== assignee));
      return;
    }

    setAssignees((prev) => [...prev, assignee]);
  };

  const addTask = () => {
    const task = {
      title: title,
      description: description,
      flag: flag,
      assignees: assignees,
      status: state,
    };
    addTheTaskToReduxHandler(task);
    setTitle("");
    setDescription("");
    setFlag("");
    setAssignees([]);
    setSubtasks([]);
    addNewTaskToggleHandler(state);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.background,
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.colors.textBackground,
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <TextField
          label="Description"
          variant="outlined"
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ margin: "3px 0" }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tooltip title="Add Assignee" placement="top">
            <AddAssignees
              members={members}
              addAssigneeHandler={addAssigneeHandler}
              assignees={assignees}
            />
          </Tooltip>
          <Tooltip title="Add Sub Task" placement="top">
            <IconButton
              size="small"
              onClick={() => {
                setShowSubtaskForm((prev) => !prev);
              }}
            >
              <AddTaskRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Attachment" placement="top">
            <IconButton
              size="small"
              onClick={(e) => {
                handleChooseFileIcon(e);
              }}
            >
              <AttachFileRoundedIcon fontSize="small" />
              <input
                type="file"
                ref={fileInput}
                onChange={(e) => handleChooseFile(e)}
                style={{ display: "none" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Start date" placement="top">
            <IconButton size="small">
              <InsertInvitationRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Due date" placement="top">
            <IconButton size="small">
              <EventAvailableRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {/* Vertical Divider */}
        </Box>
        {/* Subtasks */}
        {showSubtaskForm && (
          <AddSubtaskForm addSubtaskHandler={addSubtaskHandler} />
        )}
        {/* Assignees */}
        {assignees && assignees.length > 0 && (
          <Typography variant="caption">Assignees</Typography>
        )}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            maxHeight: 90,
            overflowY: "auto",
            mb: 1,
          }}
        >
          {assignees &&
            assignees.map((assignee) => (
              <Box
                key={assignee.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: theme.colors.textBackground,
                  padding: 1,
                  borderRadius: "5px",
                  mt: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      fontSize: 10,
                    }}
                  >
                    {assignee.firstname[0] + assignee.lastname[0]}
                  </Avatar>
                  <Typography variant="caption">
                    {assignee.firstname} {assignee.lastname}
                  </Typography>
                </Box>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    setAssignees((prev) =>
                      prev.filter((a) => a.id !== assignee.id)
                    );
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
        </Box>

        {/* All Sub tasks */}
        {subtasks && subtasks.length > 0 && (
          <Typography variant="caption">Subtasks</Typography>
        )}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            maxHeight: 90,
            overflowY: "auto",
            mb: 1,
          }}
        >
          {subtasks &&
            subtasks.map((subtask) => (
              <Box
                key={subtask.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: theme.colors.textBackground,
                  padding: 1,
                  borderRadius: "5px",
                  mt: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption">{subtask}</Typography>
                </Box>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    removeSubtaskHandler(subtask);
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
        </Box>
        {/* Files */}
        {files && files.length > 0 && (
          <Typography variant="caption">Files</Typography>
        )}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            maxHeight: 90,
            overflowY: "auto",
            mb: 1,
          }}
        >
          {files &&
            files.map((file) => (
              <Box
                key={file.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: theme.colors.textBackground,
                  padding: 1,
                  borderRadius: "5px",
                  mt: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <FileIcone fileType={file.type} />
                  <Typography variant="caption">
                    {file.name.length > 10
                      ? file.name.slice(0, 10) + "..."
                      : file.name}
                  </Typography>
                </Box>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    handleRemoveFile(file);
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
        </Box>
        {/* Select Flag and Add task */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl variant="outlined" size="small">
            <InputLabel id="demo-simple-select-outlined-label">Flag</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              label="Flag"
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                }}
                value="High"
              >
                High
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                }}
                value="Medium"
              >
                Medium
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                }}
                value="Low"
              >
                Low
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                }}
                value="None"
              >
                None
              </MenuItem>
            </Select>
          </FormControl>
          <LoadingButton
            size="small"
            variant="contained"
            color="secondary"
            sx={{
              mt: 1,
            }}
            startIcon={<AddCircleRoundedIcon />}
            onClick={addTask}
          >
            Add Task
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

function AddAssignees({ members, addAssigneeHandler, assignees }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <PersonAddAlt1RoundedIcon fontSize="small" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        {members.map((option) => (
          <MenuItem
            key={option.id}
            selected={option === "Pyxis"}
            // Small Avatar
            sx={{
              fontSize: "12px",
              // If the assignee is already added, disable the option in the menu by start checking the assignees array
              backgroundColor:
                assignees.some((a) => a.id === option.id) && "#e0e0e0",
            }}
            // When clicked, add the assignee to the task
            onClick={() => {
              addAssigneeHandler(option);
              handleClose();
            }}
          >
            {option.firstname} {option.lastname}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

// Add subtask
const AddSubtaskForm = ({ addSubtaskHandler }) => {
  const [subtask, setSubtask] = React.useState("");
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        borderRadius: "5px",
        mt: 1,
      }}
    >
      <FormControl sx={{ width: "90%" }} color="secondary" variant="outlined">
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          value={subtask}
          onChange={(e) => {
            setSubtask(e.target.value);
          }}
          sx={{
            height: "35px",
          }}
          color="secondary"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                color="secondary"
                size="small"
                onClick={() => {
                  addSubtaskHandler(subtask);
                  setSubtask("");
                }}
              >
                <AddCircleOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

// Attach FIles Form
