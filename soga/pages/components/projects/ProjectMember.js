import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar } from "@mui/material";
import { Box, useTheme } from "@mui/system";

const columns = [
  { id: "fullName", label: "Ful name", minWidth: 170 },

  {
    id: "numberOfTaskPending",
    label: "Tasks pending",
    minWidth: 170,
    align: "center",
  },
  {
    id: "numberOfTaskInProgress",
    label: "Tasks in progress",
    minWidth: 170,
    align: "center",
  },
  {
    id: "numberOfTaskDone",
    label: "Tasks done",
    minWidth: 100,
    align: "center",
  },
  {
    id: "numberOfSubProjects",
    label: "Sub projects",
    minWidth: 170,
    align: "center",
  },
];

const rows = [
  {
    fullName: "John Doe",
    numberOfTaskDone: 10,
    numberOfTaskInProgress: 5,
    numberOfTaskPending: 2,
    numberOfSubProjects: 3,
  },
  {
    fullName: "Jane Doe",
    numberOfTaskDone: 8,
    numberOfTaskInProgress: 7,
    numberOfTaskPending: 5,
    numberOfSubProjects: 4,
  },
  {
    fullName: "Michael Smith",
    numberOfTaskDone: 12,
    numberOfTaskInProgress: 3,
    numberOfTaskPending: 1,
    numberOfSubProjects: 2,
  },
  {
    fullName: "Emily Davis",
    numberOfTaskDone: 9,
    numberOfTaskInProgress: 6,
    numberOfTaskPending: 4,
    numberOfSubProjects: 5,
  },
  {
    fullName: "William Johnson",
    numberOfTaskDone: 11,
    numberOfTaskInProgress: 4,
    numberOfTaskPending: 3,
    numberOfSubProjects: 2,
  },
  {
    fullName: "Daniel Martinez",
    numberOfTaskDone: 13,
    numberOfTaskInProgress: 2,
    numberOfTaskPending: 1,
    numberOfSubProjects: 4,
  },
  {
    fullName: "Sophia Lee",
    numberOfTaskDone: 8,
    numberOfTaskInProgress: 5,
    numberOfTaskPending: 7,
    numberOfSubProjects: 3,
  },
  {
    fullName: "Emily Brown",
    numberOfTaskDone: 12,
    numberOfTaskInProgress: 4,
    numberOfTaskPending: 2,
    numberOfSubProjects: 5,
  },
  {
    fullName: "Olivia Davis",
    numberOfTaskDone: 10,
    numberOfTaskInProgress: 6,
    numberOfTaskPending: 4,
    numberOfSubProjects: 4,
  },
  {
    fullName: "Mia Anderson",
    numberOfTaskDone: 9,
    numberOfTaskInProgress: 7,
    numberOfTaskPending: 3,
    numberOfSubProjects: 2,
  },
  {
    fullName: "Ava Thomas",
    numberOfTaskDone: 11,
    numberOfTaskInProgress: 5,
    numberOfTaskPending: 2,
    numberOfSubProjects: 3,
  },
  {
    fullName: "Isabella Johnson",
    numberOfTaskDone: 8,
    numberOfTaskInProgress: 6,
    numberOfTaskPending: 6,
    numberOfSubProjects: 4,
  },
  {
    fullName: "Charlotte Lee",
    numberOfTaskDone: 12,
    numberOfTaskInProgress: 4,
    numberOfTaskPending: 1,
    numberOfSubProjects: 5,
  },
  {
    fullName: "Avery Davis",
    numberOfTaskDone: 10,
    numberOfTaskInProgress: 7,
    numberOfTaskPending: 2,
    numberOfSubProjects: 4,
  },
];

export default function ProjectMember() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(60);
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: theme.colors.textBackground,
      }}
    >
      <TableContainer sx={{ maxHeight: "76vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              justifyContent:
                                column.id !== "fullName" && "center",
                              textAlign: "center",
                            }}
                          >
                            {column.id === "fullName" && <Avatar />}
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
