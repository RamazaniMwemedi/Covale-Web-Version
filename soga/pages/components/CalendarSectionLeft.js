import * as React from "react";
import { Box, Typography } from "@mui/material";
import AddEvent from "./AddEvent";

function getDaysArray(year, month) {
  var numDaysInMonth, daysInWeek, daysIndex, index, i, l, daysArray;

  numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  daysIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  index = daysIndex[new Date(year, month - 1, 1).toString().split(" ")[0]];
  daysArray = [];

  for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
    const fullDayDetail = new Date(year, month - 1, i + 1);

    daysArray.push({
      date: i + 1,
      day: daysInWeek[index++],
      year,
      month,
      fullDayDetail,
    });
    if (index == 7) index = 0;
  }
  return daysArray;
}

export default function StaticDatePickerDemo({ value, handleChange }) {
  const [showAddEvent, setShowAddEvent] = React.useState(false);
  const [clickedDay, setClickedDay] = React.useState(null);
  const showAddEventHandler = () => {
    setShowAddEvent(true);
  };
  const hideAddEventHandler = () => {
    setShowAddEvent(false);
  };

  const clickedDayHandler = (day) => {
    setClickedDay(day);
  };

  const todayDayHandler = (day) => {
    setTodayDay(day);
  };

  const [todayDay, setTodayDay] = React.useState("");

  const clickedDayDate = new Date(value);
  const clickedDate = clickedDayDate.getDate();
  const clickedMonthDate = clickedDayDate.getMonth();
  const clickedYearDate = clickedDayDate.getFullYear();

  return (
    <Box>
      {/* Table for days of a month */}
      {value && (
        <Box
          sx={{
            flexDirection: "column",
            border: "1px solid #e0e0e0 ",
            margin: "1px",
            backgroundColor: "white",
            height: "100%",
            padding: "12px",
          }}
        >
          {showAddEvent && (
            <AddEvent
              hideAddEventHandler={hideAddEventHandler}
              clickedDay={clickedDay}
            />
          )}

          <Typography variant="h3">
            {value.toString().split(" ")[2]} {value.toString().split(" ")[1]} ,
            {todayDay}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "5px",
              width: "100%",
              paddingTop: "15px",
            }}
          >
            {getDaysArray(value.getFullYear(), value.getMonth() + 1).map(
              (day, index) => {
                const today = new Date();
                // Todays valus
                const todaysDay = today.getDate();
                const todaysMonth = today.getMonth();
                const todaysYear = today.getFullYear();

                return (
                  <Box key={index}>
                    {/* Days of the week */}
                    <Box
                      sx={{
                        //  arranged as in calendar

                        width: "80px",
                        height: "110px",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "1px",
                        fontSize: "12px",
                        textAlign: "center",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor:
                            `${day.date} ${day.month} ${day.year}` ===
                            `${clickedDate} ${
                              clickedMonthDate + 1
                            } ${clickedYearDate}`
                              ? " rgba(221, 160, 221, 0.863)"
                              : " #f5f5f5",
                          color: "black",
                          fontWeight: "bold",
                        },
                        borderRadius: "5px",
                        borderTop:
                          `${day.date} ${day.month} ${day.year}` ===
                          `${todaysDay} ${todaysMonth + 1} ${todaysYear}`
                            ? "6px solid plum"
                            : "",
                        //Styled components for the days of the week
                        "& .MuiTypography-root": {
                          fontWeight: "bold",
                          textAlign: "center",
                        },
                        paddingTop: "10px",
                        backgroundColor:
                          `${day.date} ${day.month} ${day.year}` ===
                          `${todaysDay} ${todaysMonth + 1} ${todaysYear}`
                            ? " plum"
                            : " ",

                        border:
                          `${day.date} ${day.month} ${day.year}` ===
                          `${todaysDay} ${todaysMonth + 1} ${todaysYear}`
                            ? " 2px solid plum"
                            : " 1px dotted gray",
                        backgroundColor:
                          `${day.date} ${day.month} ${day.year}` ===
                          `${clickedDate} ${
                            clickedMonthDate + 1
                          } ${clickedYearDate}`
                            ? " plum"
                            : " ",
                      }}
                      onClick={() => {
                        handleChange(day.fullDayDetail);
                        clickedDayHandler(day.fullDayDetail);
                        todayDayHandler(day.day);
                      }}
                      onDoubleClick={() => {
                        showAddEventHandler();
                      }}
                    >
                      <Typography variant="body2">{day.day}</Typography>
                      <Typography variant="button">{day.date}</Typography>
                    </Box>
                  </Box>
                );
              }
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
