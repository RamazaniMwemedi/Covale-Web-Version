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
const tasks = [
  // In Pending
  {
    title: "Task 1",
    description: "Description of task 1",
    assignor: "user1",
    assignees: ["user2", "user3"],
    startDate: new Date("2023-02-14"),
    endDate: new Date("2023-02-15"),
    status: "In Pending",
    createdAt: new Date("2023-02-14"),
    flag: "High",
    subtasks: [
      {
        title: "Subtask 1",
        description: "Description of subtask 1",
        assignor: "user1",
        assignees: ["user2", "user3"],
        startDate: new Date("2023-02-14"),
        endDate: new Date("2023-02-15"),
      },
    ],
  },
  {
    title: "Task 2",
    description: "Description of task 2",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-14"),
    endDate: new Date("2023-02-16"),
    status: "In Pending",
    createdAt: new Date("2023-02-14"),
  },
  {
    title: "Task 3",
    description: "Description of task 3",
    assignor: "user1",
    assignees: ["user2", "user3"],
    startDate: new Date("2023-02-15"),
    endDate: new Date("2023-02-17"),
    status: "In Pending",
    createdAt: new Date("2023-02-15"),
  },
  {
    title: "Task 4",
    description: "Description of task 4",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-16"),
    endDate: new Date("2023-02-18"),
    status: "In Pending",
    createdAt: new Date("2023-02-16"),
  },
  {
    title: "Task 5",
    description: "Description of task 5",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-17"),
    endDate: new Date("2023-02-19"),
    status: "In Pending",
    createdAt: new Date("2023-02-17"),
  },
  {
    title: "Task 6",
    description: "Description of task 6",
    assignor: "user1",
    assignees: ["user2", "user3"],
    startDate: new Date("2023-02-18"),
    endDate: new Date("2023-02-20"),
    status: "In Pending",
    createdAt: new Date("2023-02-18"),
  },
  {
    title: "Task 7",
    description: "Description of task 7",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-19"),
    endDate: new Date("2023-02-21"),
    status: "In Pending",
    createdAt: new Date("2023-02-19"),
  },

  // In Progress
  {
    title: "Task 8",
    description: "Description of task 8",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-10"),
    endDate: new Date("2023-02-12"),
    status: "In Progress",
    createdAt: new Date("2023-02-10"),
    flag: "Medium",
  },
  {
    title: "Task 9",
    description: "Description of task 9",
    assignor: "user1",
    assignees: ["user2", "user3"],
    startDate: new Date("2023-02-10"),
    endDate: new Date("2023-02-13"),
    status: "In Progress",
    createdAt: new Date("2023-02-10"),
  },
  {
    title: "Task 10",
    description: "Description of task 10",
    assignor: "user1",
    assignees: ["user2", "user3"],
    startDate: new Date("2023-02-12"),
    endDate: new Date("2023-02-15"),
    status: "In Progress",
    createdAt: new Date("2023-02-12"),
  },
  {
    title: "Task 11",
    description: "Description of task 11",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-14"),
    endDate: new Date("2023-02-17"),
    status: "In Progress",
    createdAt: new Date("2023-02-14"),
  },
  {
    title: "Task 12",
    description: "Description of task 12",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-16"),
    endDate: new Date("2023-02-19"),
    status: "In Progress",
    createdAt: new Date("2023-02-16"),
  },
  {
    title: "Task 13",
    description: "Description of task 13",
    assignor: "user1",
    assignees: ["user2", "user3"],
    startDate: new Date("2023-02-18"),
    endDate: new Date("2023-02-21"),
    status: "In Progress",
    createdAt: new Date("2023-02-18"),
  },
  {
    title: "Task 14",
    description: "Description of task 14",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-20"),
    endDate: new Date("2023-02-23"),
    status: "In Progress",
    createdAt: new Date("2023-02-20"),
  },
  {
    title: "Task 15",
    description: "Description of task 15",
    assignor: "user1",
    assignees: ["user2", "user3"],
    startDate: new Date("2023-02-22"),
    endDate: new Date("2023-02-25"),
    status: "In Progress",
    createdAt: new Date("2023-02-22"),
  },
  // Completed
  {
    title: "Task 16",
    description: "Description of task 16",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-01"),
    endDate: new Date("2023-02-03"),
    status: "Completed",
    createdAt: new Date("2023-02-01"),
  },
  {
    title: "Task 17",
    description: "Description of task 17",
    assignor: "user1",
    assignees: ["user2", "user3"],
    startDate: new Date("2023-02-04"),
    endDate: new Date("2023-02-06"),
    status: "Completed",
    createdAt: new Date("2023-02-04"),
  },
  {
    title: "Task 18",
    description: "Description of task 18",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-07"),
    endDate: new Date("2023-02-09"),
    status: "Completed",
    createdAt: new Date("2023-02-07"),
  },
  {
    title: "Task 19",
    description: "Description of task 19",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-10"),
    endDate: new Date("2023-02-12"),
    status: "Completed",
    createdAt: new Date("2023-02-10"),
    flag: "Low",
  },
  {
    title: "Task 20",
    description: "Description of task 20",
    assignor: "user1",
    assignees: ["user2", "user3"],
    startDate: new Date("2023-02-13"),
    endDate: new Date("2023-02-15"),
    status: "Completed",
    createdAt: new Date("2023-02-13"),
  },
  {
    title: "Task 21",
    description: "Description of task 21",
    assignor: "user1",
    assignees: ["user2"],
    startDate: new Date("2023-02-16"),
    endDate: new Date("2023-02-18"),
    status: "Completed",
    createdAt: new Date("2023-02-16"),
  },
  { status: "New State" },
];

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
          borderBottom: "1px solid #eee",
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
          +
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

      {/* Add more task details as needed */}
    </Box>
  );
};
