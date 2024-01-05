import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import {
  TaskInterface,
  ThemeInterface,
  UserInterFace,
} from "../../../interfaces/myprofile";

function getUserTaskStatus(
  userId: string,
  allTasks: TaskInterface[],
  taskStatus: ["Pending" | "In Progress" | "Completed"]
) {
  // Filter tasks by assignor or assignees
  const userTasks = allTasks.filter(
    (task) =>
      task.assignor.id === userId ||
      task.assignees.map((assignee) => assignee.id)[0].includes(userId)
  );

  // Count tasks by status
  const taskCounts = taskStatus.reduce((acc, status) => {
    const count = userTasks.filter((task) => task.status === status).length;
    acc[status.toLowerCase().replace(/\s/g, "") + "Tasks"] = count;
    return acc;
  }, {} as Record<string, number>);

  // Return object with user's task status
  return {
    userId,
    pendingTasks: taskCounts.pendingtasks,
    inprogressTasks: taskCounts.inprogresstasks,
    completedTasks: taskCounts.completedtasks,
    ...taskCounts,
  };
}

export default function ProjectMember({
  members,
  taskStatus,
  allTasks,
}: {
  members: UserInterFace[];
  taskStatus: ["Pending" | "In Progress" | "Completed"];
  allTasks: TaskInterface[];
}) {
  const columnMap =
    taskStatus &&
    taskStatus.reduce((acc, status) => {
      const id = status.toLowerCase().replace(/\s/g, "") + "Tasks";
      const label = status + " tasks";
      acc[id] = { id, label, minWidth: 170 };
      return acc;
    }, {} as Record<string, { id: string; label: string; minWidth: number }>);

  const columns = columnMap && [
    { id: "firstName", label: "First name", minWidth: 170 },
    ...Object.values(columnMap),
  ];

  const theme: ThemeInterface = useTheme();

  return (
    <>
      {columns && (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            backgroundColor: theme.colors.textBackground,
          }}
        >
          <TableContainer sx={{ maxHeight: "71vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={"center"}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {members.slice(0 * 60, 0 * 60 + 60).map((member) => {
                  const taskStatusCount = getUserTaskStatus(
                    member.id,
                    allTasks,
                    taskStatus
                  );
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={member.id}
                    >
                      {columns.map((column) => {
                        const value = members[+column.id];
                        return (
                          <TableCell key={column.id} align={"center"}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                                justifyContent:
                                  column.id !== "firstName"
                                    ? "center"
                                    : "inherit",
                                textAlign: "center",
                              }}
                            >
                              {column.id === "firstName" && (
                                <Avatar
                                  sx={{
                                    width: 30,
                                    height: 30,
                                    fontSize: 10,
                                  }}
                                >
                                  {member.firstname[0]}
                                  {member.lastname[0]}
                                </Avatar>
                              )}
                              {column.id === "firstName" && (
                                <Typography variant="body2">
                                  {member.firstname}
                                  {"  "}
                                  {member.lastname}
                                </Typography>
                              )}
                              {column.id === "pendingTasks" &&
                                taskStatusCount.pendingTasks}
                              {column.id === "inprogressTasks" &&
                                taskStatusCount.inprogressTasks}
                              {column.id === "completedTasks" &&
                                taskStatusCount.completedTasks}
                            </Box>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
}
