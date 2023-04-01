import * as React from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Checkbox,
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
import { useDispatch, useSelector } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Moment from "moment";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SaveIcon from "@mui/icons-material/Save";

import {
  addCommentToTask,
  addTaskToSubProject,
  updateTasks,
} from "../../../../Redux/slices/projects";
import FileIcone from "../../mediaFiles/FileIcon";
import dayjs from "dayjs";
import {
  commmentTask,
  createNewTask,
  modifyTask,
} from "../../../../services/projects";
import moment from "moment";
import FileComponent from "../../mediaFiles/FileComponent";

const KanbanView = ({
  project,
  subProject,
  taskStatus,
  handleShowFile,
  showChats,
}) => {
  const members = project && project.members;
  const tasks = subProject && subProject.tasks;
  const id = subProject && subProject.id;
  const title = subProject && subProject.title;
  const dispatch = useDispatch();
  // Add tasks handlers
  // Add Pending tasks handlers
  const addTheTaskToReduxHandler = (task) => {
    dispatch(
      addTaskToSubProject({
        projectId: project.id,
        subProjectId: id,
        task,
      })
    );
  };
  return (
    <>
      {members && (
        <Box sx={{ width: showChats ? "600px" : "900px" }}>
          <Typography variant="h6">{title}</Typography>
          <TaskStates
            tasks={tasks}
            taskStatus={taskStatus}
            addTheTaskToReduxHandler={addTheTaskToReduxHandler}
            id={id}
            members={members}
            projectId={project}
            handleShowFile={handleShowFile}
          />
        </Box>
      )}
    </>
  );
};

export default KanbanView;

function TaskStates({
  tasks,
  taskStatus,
  addTheTaskToReduxHandler,
  id,
  members,
  projectId,
  handleShowFile,
}) {
  // Copy the values from the taskStatus to states and add "New State" to the end
  const states = [...taskStatus, "New State"];
  const categorizedTasks = {};
  const dispatch = useDispatch();
  states.forEach((state) => {
    categorizedTasks[state] = tasks.filter((task) => task.status === state);
  });
  // userStore
  const userStore = useSelector((state) => state.user);
  const user = userStore.user ? userStore.user : null;
  const token = user ? user.token : null;

  const handleDrop = async (event, newStatus) => {
    event.preventDefault();
    if (newStatus !== "New State") {
      const taskId = event.dataTransfer.getData("taskId");
      const updatedTasks = tasks.map((task) => {
        if (task.id.toString() === taskId) {
          return { ...task, status: newStatus };
        } else {
          return task;
        }
      });
      dispatch(
        updateTasks({
          projectId,
          subProjectId: id,
          newTasks: updatedTasks,
        })
      );
      const data = await modifyTask(token, taskId, {
        status: newStatus,
      });
    }
  };
  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("taskId", taskId.toString());
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "75vh",
        overflowY: "hidden",
        display: "flex",
        backgroundColor: "unset",
      }}
    >
      {states.map((state) => (
        <div
          key={state}
          onDrop={(event) => handleDrop(event, state)}
          onDragOver={(event) => event.preventDefault()}
        >
          <TaskBlock
            key={state}
            state={state}
            addTheTaskToReduxHandler={addTheTaskToReduxHandler}
            id={id}
            tasks={categorizedTasks[state]}
            members={members}
            projectId={projectId}
            handleShowFile={handleShowFile}
            handleDragStart={handleDragStart}
          />
        </div>
      ))}
    </Box>
  );
}

const TaskBlock = ({
  state,
  tasks,
  addTheTaskToReduxHandler,
  id,
  members,
  projectId,
  handleShowFile,
  handleDragStart,
}) => {
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
          id={id}
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
        {tasks.map((task, i) => (
          <div
            key={task.id}
            draggable
            onDragStart={(event) => handleDragStart(event, task.id)}
          >
            <TaskComponent
              key={task.id}
              task={task}
              projectId={projectId}
              handleShowFile={handleShowFile}
              index={i}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};

const TaskComponent = ({ task, projectId, handleShowFile, index }) => {
  const theme = useTheme();
  let flagColor;
  if (task.flag === "High") {
    flagColor = theme.palette.error.main;
  } else if (task.flag === "Medium") {
    flagColor = theme.palette.warning.main;
  } else if (task.flag === "Low") {
    flagColor = theme.palette.success.main;
  } else {
    flagColor = "lightgray";
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
        <Tooltip title={task.flag ? task.flag : "None"} placement="top" arrow>
          <Box
            sx={{
              width: "12px",
              height: "12px",
              borderRadius: "25%",
              backgroundColor: flagColor,
            }}
          />
        </Tooltip>
        <MoreMenu />
      </Box>
      {/* Task details */}

      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
        }}
      >
        {task.title}
      </Typography>
      <Typography variant="body2">{task.description}</Typography>
      <br />

      {/* Sub Tasks */}
      {task.subTasks && task.subTasks.length > 0 && (
        <FormControl>
          <Typography variant="body2">Sub Tasks</Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {task.subTasks.map((subtask) => (
              <FormControlLabel
                value={subtask.done}
                control={<Checkbox size="small" color="secondary" />}
                label={subtask.title}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      {task.subTasks.length > 0 && <Divider sx={{ margin: "10px 0" }} />}
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
      {/* Time remaining startDate substract dueDate dayjs*/}
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <IconButton size="small">
          <AccessTimeRoundedIcon />
        </IconButton>
        <Typography variant="caption">
          {/* date and time should be in Days, Hours:Minute format */}
          {task.startDate && task.dueDate
            ? dayjs(task.dueDate).diff(dayjs(task.startDate), "day")
            : "Time Remaining"}{" "}
          Days Remaining
        </Typography>
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
        <TaskAssignees task={task} />
        <Box
          sx={{
            display: "flex",
            gap: "5px",
          }}
        >
          <Badge
            badgeContent={
              task.comments && task.comments.length > 0
                ? task.comments.length
                : 0
            }
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                margin: "5px",
              },
            }}
          >
            <TasksComments
              comments={task.comments}
              taskId={task.id}
              subProjectId={task.subProject}
              projectId={projectId}
            />
          </Badge>
          <Badge
            badgeContent={
              task.files && task.files.length > 0 ? task.files.length : 0
            }
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                margin: "7px",
              },
            }}
          >
            <TaskFiles files={task.files} handleShowFile={handleShowFile} />
          </Badge>
        </Box>
      </Box>
    </Box>
  );
};

const ITEM_HEIGHT = 48;
function TasksComments({ comments, taskId, subProjectId, projectId }) {
  // userStore
  const userStore = useSelector((state) => state.user);
  const user = userStore.user ? userStore.user : null;
  const token = user ? user.token : null;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [content, setContent] = React.useState("");
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();

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
        <CommentRoundedIcon color="secondary" />
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
            width: "30ch",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: "400px",
            borderRadius: "10px",
          },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Task Comments
        </Typography>
        <Box
          sx={{
            height: "310px",
            overflowY: "scroll",
          }}
        >
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  display: "flex",
                  gap: "10px",
                  backgroundColor: theme.colors.textBackground,
                  mt: "5px",
                  ml: "5px",
                  p: "5px",
                  borderRadius: "5px",
                  // box shadow
                  boxShadow: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: 10,
                  }}
                >
                  {comment.author.firstname[0]} {comment.author.lastname[0]}
                </Avatar>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {comment.author.firstname} {comment.author.lastname}
                  </Typography>
                  <Typography variant="body2">{comment.content}</Typography>

                  <Typography variant="caption">
                    On{" "}
                    {moment(comment.createdAt).format("MMMM Do YYYY HH:mm:ss ")}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <MenuItem
              sx={{
                display: "flex",
                gap: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption">
                No comments on this task yet.
              </Typography>
            </MenuItem>
          )}
        </Box>
        <FormControl sx={{ p: 1, width: "100%" }} variant="outlined">
          <OutlinedInput
            startAdornment={
              <InputAdornment
                sx={{
                  marginLeft: "-10px",
                }}
                position="start"
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: 10,
                  }}
                >
                  {user.firstname[0]} {user.lastname[0]}
                </Avatar>
              </InputAdornment>
            }
            id="outlined-adornment-password"
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            sx={{
              height: "35px",
              borderRadius: "15px",
            }}
            placeholder="Add a comment..."
            color="secondary"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={async () => {
                    setContent("");
                    const comment = await commmentTask(token, taskId, content);
                    dispatch(
                      addCommentToTask({
                        projectId,
                        subProjectId,
                        taskId,
                        comment,
                      })
                    );
                  }}
                  edge="end"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="purple"
                    // class="bi bi-send-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                  </svg>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Menu>
    </div>
  );
}

function TaskFiles({ files, handleShowFile }) {
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
        <AttachFileRoundedIcon color="secondary" />{" "}
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
            width: "30ch",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: "400px",
            borderRadius: "10px",
          },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Task Comments
        </Typography>
        <Box
          sx={{
            height: "310px",
            overflowY: "scroll",
          }}
        >
          {files.length > 0 ? (
            files.map((file) => (
              <MenuItem
                sx={{
                  display: "flex",
                  gap: "5px",
                }}
                key={file}
                selected={file === "Pyxis"}
                onClick={() => handleShowFile(file)}
              >
                <FileComponent file={file} />
              </MenuItem>
            ))
          ) : (
            <MenuItem
              sx={{
                display: "flex",
                gap: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption">No attached files</Typography>
            </MenuItem>
          )}
        </Box>
      </Menu>
    </div>
  );
}
function TaskAssignees({ task }) {
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
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
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
              {assignee.firstname[0]} {assignee.lastname[0]}
            </Avatar>
          ))}
      </AvatarGroup>
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
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "30ch",
          },
        }}
      >
        {task.assignees &&
          task.assignees.map((assignee) => (
            <MenuItem
              key={assignee._id}
              selected={assignee === "Pyxis"}
              onClick={handleClose}
              sx={{
                display: "flex",
                gap: "5px",
              }}
            >
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  fontSize: 10,
                }}
              >
                {assignee.firstname[0]}
                {assignee.lastname[0]}
              </Avatar>

              <Typography variant="body2" color="text.secondary">
                {assignee.firstname} {assignee.lastname}
              </Typography>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}

// Form for adding new task
const AddTaskForm = ({
  addTheTaskToReduxHandler,
  id,
  state,
  addNewTaskToggleHandler,
  members,
}) => {
  // userStore
  const userStore = useSelector((state) => state.user);
  const user = userStore.user ? userStore.user : null;
  const token = user ? user.token : null;
  const theme = useTheme();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [flag, setFlag] = React.useState("");
  const [assignees, setAssignees] = React.useState([]);
  const [addingTask, setAddingTask] = React.useState(false);
  const [addingTaskError, setAddingTaskError] = React.useState("");
  // Subtask state
  const [subtasks, setSubtasks] = React.useState([]);
  const [showSubtaskForm, setShowSubtaskForm] = React.useState(false);

  // File states
  const [files, setFiles] = React.useState([]);
  const fileInput = React.useRef(null);
  // Date
  const [startDate, setValueStartDate] = React.useState(
    Moment(new Date()).format("lll")
  );
  const [dueDate, setValueDueDate] = React.useState(
    Moment(new Date()).format("lll")
  );

  //  Date handlers
  const onStartDateChange = (date) => {
    setValueStartDate(date);
  };
  const onDueDateChange = (date) => {
    setValueDueDate(date);
  };

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

  const handleChooseFile = (e) => {
    // input change handler
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFiles((prev) => [
        ...prev,
        {
          file: file,
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

  const addTask = async () => {
    // If title is an empty string or a space, return
    if (title.trim() === "") {
      setAddingTaskError("Task title cannot be empty");
      setTimeout(() => {
        setAddingTaskError("");
      }, 2000);

      return;
    }

    if (assignees.length === 0) {
      setAddingTaskError("Assignees cannot be empty");
      setTimeout(() => {
        setAddingTaskError("");
      }, 2000);
      return;
    }

    // Date
    if (startDate > dueDate) {
      setAddingTaskError("Start date cannot be after due date");
      setTimeout(() => {
        setAddingTaskError("");
      }, 2000);
      return;
    }

    setAddingTask(true);
    console.log("subtasks", subtasks);
    const formData = new FormData();

    for (const file of files) {
      formData.append("files", file.file);
    }
    const allAsignees = new Array();
    for (let index = 0; index < assignees.length; index++) {
      const element = assignees[index];

      allAsignees.push(element.id);
    }
    for (const subtask of subtasks) {
      formData.append("subtasks", subtask);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("flag", flag);
    formData.append("assignees", JSON.stringify(allAsignees));
    formData.append("status", state);
    formData.append("subtasks", subtasks);
    formData.append("startDate", startDate);
    formData.append("dueDate", dueDate);

    console.log("The form data", formData);
    const sentTasktoServer = await createNewTask(token, formData, id);

    addTheTaskToReduxHandler(sentTasktoServer);
    setTitle("");
    setDescription("");
    setFlag("");
    setAssignees([]);
    setSubtasks([]);
    addNewTaskToggleHandler(state);
    setAddingTask(false);
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
        <Typography variant="caption" color="error">
          {addingTaskError}
        </Typography>
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
          <DateTimePickerForm
            startDate={startDate}
            dueDate={dueDate}
            onStartDateChange={onStartDateChange}
            onDueDateChange={onDueDateChange}
          />
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
        {/* Date start date and due date */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
            gap: "15px",
          }}
        >
          <Typography variant="caption">Start Date</Typography>
          <Typography variant="caption">Due Date</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography variant="caption">
            {startDate ? startDate.toString() : "No Date"}
          </Typography>
          <Typography variant="caption">
            {dueDate ? dueDate.toString() : "No Date"}
          </Typography>
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
            loading={addingTask}
            sx={{
              mt: 1,
            }}
            startIcon={addingTask ? <SaveIcon /> : <AddCircleRoundedIcon />}
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

// Date time picker from for start and end date
function DateTimePickerForm({
  startDate,
  dueDate,
  onDueDateChange,
  onStartDateChange,
}) {
  const [anchorElForStartDate, setAnchorElForStartDate] = React.useState(null);
  const openForStartDate = Boolean(anchorElForStartDate);

  const handleClickForStartDate = (event) => {
    setAnchorElForStartDate(event.currentTarget);
  };
  const handleCloseForStartDate = () => {
    setAnchorElForStartDate(null);
  };

  const [anchorElForDueDate, setAnchorElForDueDate] = React.useState(null);
  const openForDueDate = Boolean(anchorElForDueDate);
  const handleClickForDueDate = (event) => {
    setAnchorElForDueDate(event.currentTarget);
  };
  const handleCloseForDueDate = () => {
    setAnchorElForDueDate(null);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Tooltip title="Start date" placement="top">
          <IconButton size="small" onClick={handleClickForStartDate}>
            <InsertInvitationRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Due date" placement="top">
          <IconButton size="small" onClick={handleClickForDueDate}>
            <EventAvailableRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorElForStartDate}
        open={openForStartDate}
        onClose={handleCloseForStartDate}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "auto",
            color: "red",
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField color="secondary" {...props} />}
            label="DateTimePicker"
            value={startDate}
            onChange={(newValue) => {
              onStartDateChange(newValue);
            }}
            minDate={new Date()}
          />
        </LocalizationProvider>
      </Menu>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorElForDueDate}
        open={openForDueDate}
        onClose={handleCloseForDueDate}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "auto",
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField color="secondary" {...props} />}
            label="DateTimePicker"
            value={dueDate}
            onChange={(newValue) => {
              onDueDateChange(newValue);
            }}
            minDate={startDate}
          />
        </LocalizationProvider>
      </Menu>
    </Box>
  );
}

function MoreMenu() {
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
        <MoreVertIcon fontSize="small" />
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
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem>Move to</MenuItem>
      </Menu>
    </div>
  );
}
