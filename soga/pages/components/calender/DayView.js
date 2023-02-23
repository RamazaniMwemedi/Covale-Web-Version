const {
  Box,
  Button,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} = require("@mui/material");
const { useEffect, useState } = require("react");
import Moment from "moment";
import PropTypes from "prop-types";

const DayView = ({ selectedDate, handleDateChange }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const selectEventHandler = (event) => setSelectedEvent(event);
  const removeEvent = () => setSelectedEvent(null);

  useEffect(() => {
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

  console.log(selectedDate._d);
  // Console.log date in format of date, weekday
  console.log();

  return (
    <Box className="day-view">
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          p: 1,
        }}
      >
        <Button
          onClick={() => {
            handleDateChange(selectedDate.clone().subtract(1, "day"));
          }}
        >
          {"<"}
        </Button>
        <Box>{selectedDate.format("dddd, MMMM Do YYYY")}</Box>
        <Button
          onClick={() => handleDateChange(selectedDate.clone().add(1, "day"))}
        >
          {">"}
        </Button>
      </Box>
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
              <TableRow style={{}}>
                <TableCell
                  style={{
                    width: "10%",
                  }}
                ></TableCell>
                {[0].map((day) => {
                  const date = selectedDate.clone().weekday(day);

                  return (
                    <TableCell
                      style={{
                        border: "1px solid #dddddd",
                        borderTop: `${
                          selectedDate.isSame(Moment(), "day")
                            ? "3px solid #5f2eea"
                            : ""
                        }`,
                        textAlign: "left",
                        padding: "8px",
                      }}
                      key={day}
                      conClick={() => {
                        console.log("selectedDate :>>", selectedDate);
                        // handleDateChange(selectedDate);
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        {selectedDate.format("Do, dddd")}
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
                    {[0].map((day) => {
                      const date = selectedDate.clone().weekday(day);
                      return (
                        <TableCell
                          style={{
                            border: "1px solid #dddddd",
                            textAlign: "left",
                            padding: "8px",
                          }}
                          key={day}
                          onClick={() => {
                            const nowEvents = events.filter(
                              (event) =>
                                Moment(event.start).isSame(
                                  selectedDate,
                                  "day"
                                ) && Moment(event.start).hour() === hour
                            );
                            selectEventHandler(nowEvents);
                            handleDateChange(selectedDate);
                          }}
                        >
                          {events
                            .filter(
                              (event) =>
                                Moment(event.start).isSame(
                                  selectedDate,
                                  "day"
                                ) && Moment(event.start).hour() === hour
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
    </Box>
  );
};

DayView.propTypes = {
  selectedDate: PropTypes.array.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default DayView;
