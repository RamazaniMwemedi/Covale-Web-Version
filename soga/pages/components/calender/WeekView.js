import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, IconButton } from "@mui/material";

import Moment from "moment";
import WeekPicker from "./WeekPicker";

export default function WeekView({
  selectedDate,
  handleDateChange,
  handleNextWeek,
  handlePrevWeek,
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
    <Paper sx={{ width: "100%" }}>
      <WeekPicker
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        handlePrevWeek={handlePrevWeek}
        handleNextWeek={handleNextWeek}
      />
      <Box
        sx={{
          display: "flex",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: 500,
            position: "sticky",
            flex: selectedEvent ? "0.72" : "1",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                  const date = selectedDate.clone().weekday(day);

                  return (
                    <TableCell
                      style={{
                        border: "1px solid #dddddd",
                        // If day is today Border top should be purple
                        borderTop: `${
                          date.isSame(Moment(), "day")
                            ? "3px solid #5f2eea"
                            : ""
                        }`,
                        textAlign: "left",
                        padding: "8px",
                      }}
                      key={day}
                      conClick={() => {
                        handleDateChange(date);
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <Box className="date">{date.format("D")}</Box>
                        {selectedDate.clone().weekday(day).format("dddd")}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23,
              ].map((hour) => {
                return (
                  <TableRow
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "left",
                      padding: "8px",
                      ":nth-child(even)": {
                        backgroundColor: "#dddddd",
                      },
                      top: 57,
                      height: "100px",
                    }}
                    key={hour}
                  >
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      {hour}:00
                    </td>
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                      const date = selectedDate.clone().weekday(day);
                      return (
                        <TableCell
                          style={{
                            border: "1px solid #dddddd",
                            textAlign: "left",
                            padding: "8px",
                            backgroundColor: `${
                              date.isSame(Moment(), "day") && "lightgray"
                            }`,
                          }}
                          key={day}
                          onClick={() => {
                            const thiwWeekEvents = events.filter(
                              (event) =>
                                Moment(event.start).isSame(date, "day") &&
                                Moment(event.start).hour() === hour
                            );
                            selectEventHandler(thiwWeekEvents);
                            handleDateChange(date);
                          }}
                        >
                          {events
                            .filter(
                              (event) =>
                                Moment(event.start).isSame(date, "day") &&
                                Moment(event.start).hour() === hour
                            )
                            .map((event) => {
                              return <Box key={event.id}> {event.title}</Box>;
                            })}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
}
