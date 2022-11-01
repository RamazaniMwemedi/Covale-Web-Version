import * as React from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  AvatarGroup,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { useTheme } from "@mui/styles";

const heights = [
  150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

const Item = ({ height, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "whitesmoke",
        height: "auto",
      }}
    >
      {children}
    </Box>
  );
};

const KanbanView = ({ taskViewValue }) => {
  return (
    <Box
      sx={{
        width: "74vw",
        ml: 0.5,
        minHeight: 393,
        // backgroundColor: "red",
        // display: "flex",
      }}
    >
      <SectionsBoxs />
    </Box>
  );
};

export default KanbanView;

const array = ["To do", "In Progress", "Completed", "Add Section"];
const SectionsBoxs = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContenet: "center",
        gap: 1,
        width: "auto",
        height: "72vh",
        overflowX: "auto",
        overflowY: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {array.map((element, i) => {
        return <SectionBox key={i} sectionName={element} />;
      })}
    </Box>
  );
};

const SectionBox = ({ sectionName }) => {
  const tasks = ["New", "Group"];
  const theme = useTheme();
  return (
    <Box sx={{ p: 0.2 }}>
      {/* Top */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          width: "280px",
          maxWidth: "280px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              backgroundColor: "red",
              height: "10px",
              width: "10px",
              borderRadius: "5px",
            }}
          />
          <Typography>{sectionName}</Typography>
        </Box>

        <IconButton>
          <MoreVertRoundedIcon />
        </IconButton>
      </Box>
      {/*New Task Button */}
      <Button variant="contained" color="secondary" sx={{ width: "100%" }}>
        <AddIcon />
      </Button>
      {/* Tasks */}
      {tasks.map((task, i) => {
        return <TaskDraggableCard task={task} key={i} />;
      })}
    </Box>
  );
};

const TaskDraggableCard = ({ task }) => {
  console.log("Tasks :", task);
  const { title, description, status, priority, subtasks } = task;
  const theme = useTheme();

  return (
    <Paper
      sx={{
        borderRadius: "5px",
        mt: 2,
        backgroundColor: theme.colors.background1,
        p: 1,
      }}
    >
      {/* Top Of Task Box */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Box */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <StatusComponent />
          <PriorityComponent />
        </Box>
        {/* Right Box */}
        <Box>
          <IconButton>
            <MoreVertRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      {/*End Of
       Top Of Task Box */}

      {/* Task Title Box */}
      <Box>
        <Typography variant="subtitle1" fontSize={"20px"}>
          {title}
        </Typography>
      </Box>
      {/*End Of
       Task Title Box */}
      {/* Task Description Box */}
      <Box>
        <Typography>{description}</Typography>
      </Box>

      {/*End Of
       Task Description Box */}
      {/* Sub Task Box */}
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 1,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <IconButton>
            <RadioButtonUncheckedRoundedIcon />
          </IconButton>
          Sub Tasks
        </Box>
      </Box>
      <Divider />
      {/*End Of
       Sub Task Box */}
      {/* Add Sub Task Box */}
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <IconButton>
            <AddIcon />
          </IconButton>
          Add Subtask
        </Box>
      </Box>

      {/*End Of
       Add Sub Task Box */}
      <Divider />
      {/* Task Bottom */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Box */}
        <Box>
          <TotalAssignees />
        </Box>
        {/* Right Box */}
        <Box>
          <IconButton>
            <CommentRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      {/*End Of
       Task Bottom */}
    </Paper>
  );
};

const StatusComponent = () => {
  return (
    <Paper
      sx={{
        backgroundColor: "dodgerblue",
        borderRadius: "10px",
        height: "25px",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: "15px", p: 1, pt: 0 }}>
        Status
      </Typography>
    </Paper>
  );
};
const PriorityComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "green",
        borderRadius: "10px",
        height: "25px",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: "15px", p: 1, pt: 0 }}>
        Priority
      </Typography>
    </Box>
  );
};
function TotalAssignees() {
  return (
    <AvatarGroup
      total={24}
      sx={{
        "& .MuiAvatar-root": { width: 25, height: 25, fontSize: 8 },
        pt: 1,
      }}
    >
      <Avatar
        alt="Agnes Walker"
        src="https://mui.com/static/images/avatar/4.jpg"
      />
      <Avatar
        alt="Trevor Henderson"
        src="https://mui.com/static/images/avatar/5.jpg"
      />
    </AvatarGroup>
  );
}
