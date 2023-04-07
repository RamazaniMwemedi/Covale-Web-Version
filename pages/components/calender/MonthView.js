import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, IconButton, Typography } from "@mui/material";

import Moment from "moment";
// import MonthPicker from "./MonthPicker";
// import EventsComponent from "./EventsComponent";

export default function MonthView({
  selectedDate,
  handleDateChange,
  handleNextMonth,
  handlePrevMonth,
}) {
  const [events, setEvents] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const selectEventHandler = (event) => setSelectedEvent(event);
  const removeEvent = () => setSelectedEvent(null);

  React.useEffect(() => {
    // code to fetch events for the selected date goes here

    const startOfWeek = selectedDate.clone().startOf("week");
    const endOfWeek = selectedDate.clone().endOf("week");

    const events = [
      {
        id: 1,
        title: "Event 1",
        start: startOfWeek.clone().add(1, "day").add(1, "hour"),
        end: endOfWeek.clone().add(1, "day").add(2, "hour"),
      },
      {
        id: 2,
        title: "Event 2",
        start: startOfWeek.clone().add(2, "day").add(1, "hour"),
        end: endOfWeek.clone().add(2, "day").add(2, "hour"),
      },
      {
        id: 3,
        title: "Event 3",
        start: startOfWeek.clone().add(3, "day").add(1, "hour"),
        end: endOfWeek.clone().add(3, "day").add(2, "hour"),
      },
      {
        id: 4,
        title: "Event 4",
        start: startOfWeek.clone().add(4, "day").add(1, "hour"),
        end: endOfWeek.clone().add(4, "day").add(2, "hour"),
      },
      {
        id: 5,
        title: "Event 5",
        start: startOfWeek.clone().add(5, "day").add(1, "hour"),
        end: endOfWeek.clone().add(5, "day").add(2, "hour"),
      },
      {
        id: 6,
        title: "Event 6",
        start: startOfWeek.clone().add(1, "day").add(14, "hour"),
        end: endOfWeek.clone().add(6, "day").add(6, "hour"),
      },
      {
        id: 7,
        title: "Event 7",
        start: startOfWeek.clone().add(7, "day").add(1, "hour"),
        end: endOfWeek.clone().add(7, "day").add(2, "hour"),
      },
    ];

    setEvents(events);
  }, [selectedDate]);

  return (
    <>
      {selectedDate && (
        <Box
          sx={{
            height: "100vh",
            bgcolor: "red",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              gap: 8,
            }}
          >
            <Button
              size="small"
              color="secondary"
              variant="contained"
              sx={{
                borderRadius: "5px",
                padding: "5px 10px",
                textTransform: "none",
              }}
              onClick={() => handleDateChange(Moment())}
            >
              Today
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <IconButton
                onClick={() =>
                  handleDateChange(selectedDate.clone().subtract(1, "month"))
                }
              >
                {"<"}
              </IconButton>
              <Typography variant="h5">
                {selectedDate.format("MMMM YYYY")}
              </Typography>
              <IconButton
                onClick={() =>
                  handleDateChange(selectedDate.clone().add(1, "month"))
                }
              >
                {">"}
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ maxHeight: 500, flexGrow: 1, display: "flex" }}>
            <TableContainer
              sx={{
                flex: selectedEvent ? "0.72" : "1",
                bgcolor: "green",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
              component={Box}
              lexGrow={1}
            >
              <Table
                style={{
                  borderCollapse: "collapse",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <TableHead
                  style={{
                    border: "1px solid #ccc",
                    height: "50px",
                  }}
                >
                  <TableRow
                    style={{
                      border: "1px solid #ccc",
                    }}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                      <TableCell
                        style={{
                          border: "1px solid #ccc",
                        }}
                        key={day}
                      >
                        {selectedDate.clone().weekday(day).format("dddd")}
                      </TableCell>
                    ))}
                  </TableRow>{" "}
                </TableHead>
                <TableBody
                  style={{
                    border: "1px solid #ccc",
                    overflowX: "scroll",
                    height: "100px",
                  }}
                >
                  {[0, 1, 2, 3, 4, 5].map((week) => (
                    <TableRow key={week}>
                      {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                        const date = selectedDate
                          .clone()
                          .startOf("month")
                          .add(week, "week")
                          .weekday(day);
                        date.month() === selectedDate.month() ? (
                          <Box className="date">{date.format("D")}</Box>
                        ) : null;
                        return (
                          <TableCell
                            key={day}
                            sx={{
                              // if the date is in the past month, make it gray
                              color:
                                date.month() === selectedDate.month()
                                  ? "black"
                                  : "gray",

                              // if the date in in the past month and date is in the past and not the comming month , make it background yellow but not today, let today be dodgerblue

                              backgroundColor: `${
                                date.isSame(Moment(), "day") && "lightgray"
                              }`,
                              // Today's date should be highlighted

                              borderTop: `${
                                date.isSame(Moment(), "day")
                                  ? "3px solid #5f2eea"
                                  : "1px solid #dddddd"
                              }`,
                              borderLeft: "1px solid #ccc",
                              borderBottom: "1px solid #ccc",
                              borderRight: "1px solid #ccc",
                              height: "100px",
                            }}
                            onClick={() => {
                              const toDateEvents = events.filter((event) =>
                                Moment(event.start).isSame(date, "day")
                              );
                              selectEventHandler(toDateEvents);
                              handleDateChange(date);
                            }}
                          >
                            {/* Show date of the last month this month and the coming month */}
                            {date.format("D")}

                            <Box className="events">
                              {events
                                .filter((event) =>
                                  Moment(event.start).isSame(date, "day")
                                )
                                .map((event) => (
                                  <Box key={event.id}>{event.title}</Box>
                                ))}
                            </Box>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </>
  );
}
