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
  Paper,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { useTheme } from "@mui/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";

const tasks = [];

const KanbanView = ({ taskViewValue }) => {
  const states = ["In Pending", "In Progress", "Completed", "Add Status"];
  return (
    <Box sx={{ width: "300px" }}>
      <Typography variant="h6">Kanban View</Typography>
      <TaskStates tasks={tasks} />
    </Box>
  );
};

export default KanbanView;

function TaskStates({ tasks }) {
  const states = [...new Set(tasks.map((task) => task.status))];
  const categorizedTasks = {};

  states.forEach((state) => {
    categorizedTasks[state] = tasks.filter((task) => task.status === state);
  });
  return (
    <Box
      sx={{
        width: "80vw",
        height: "75vh",
        overflowX: "scroll",
        display: "flex",
        backgroundColor: "unset",
      }}
    >
      {states.map((state) => (
        <TaskBlock key={state} state={state} tasks={categorizedTasks[state]} />
      ))}
    </Box>
  );
}
const TaskBlock = ({ state, tasks }) => {
  const theme = useTheme();
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
            color:
              state === "New State" ? "#fff" : theme.palette.secondary.main,
          }}
          color="secondary"
        >
          <AddRoundedIcon />
        </Button>
      </Box>
      {/* Scrollable container */}
      <Box
        sx={{
          maxHeight: "90vh",
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
  console.log(task.flag);
  return (
    <Box
      sx={{
        width: "300px",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: theme.colors.textBackground,
        borderRadius: "5px",
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

      <Typography variant="body2">{task.title}</Typography>
      <Typography variant="body2">{task.description}</Typography>

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
        <Typography variant="body2">Add Sub Task</Typography>
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
              : 3
          }
          max={3}
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
                {assignee}
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
