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
  const [clickedDay, setClickedDay] = React.useState(null)
  const showAddEventHandler = () => {
    setShowAddEvent(true);
  };
  const hideAddEventHandler = () => {
    setShowAddEvent(false);
  };

  const clickedDayHandler = (day) => { 
    setClickedDay(day)
   }
   const clickedDayDate = new Date(clickedDay);
    const clickedDate = clickedDayDate.getDate();
    const clickedMonthDate = clickedDayDate.getMonth();
    const clickedYearDate = clickedDayDate.getFullYear();

   console.log(clickedYearDate, clickedMonthDate);
  return (
    <Box>
      {/* Table for days of a month */}
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

        <Typography variant="h2">
          {value.toString().split(" ")[1]} {value.toString().split(" ")[3]}{" "}
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
                <Box>
                  {/* Days of the week */}
                  <Box
                    key={index}
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
                        backgroundColor: "#f5f5f5",
                        color: "black",
                        fontWeight: "bold",
                      },
                      borderRadius: "5px",
                      borderTop:
                        `${day.date} ${day.month} ${day.year}` ===
                        `${todaysDay} ${todaysMonth + 1} ${todaysYear}`
                          ? "4px solid purple"
                          : "1px solid gray",
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
                      // backgroundColor:
                      //   `${day.date} ${day.month} ${day.year}` ===
                      //   `${todaysDay} ${todaysMonth + 1} ${todaysYear}`
                      //     ? "plum"
                      //     : " ",
                      border:
                        `${day.date} ${day.month} ${day.year}` ===
                        `${todaysDay} ${todaysMonth + 1} ${todaysYear}`
                          ? " "
                          : " 1px solid gray",
                          
                    }}
                    onClick={() => {
                      handleChange(day.fullDayDetail);
                    }}
                    onDoubleClick={() => {
                      showAddEventHandler();
                      clickedDayHandler(day.fullDayDetail);
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
    </Box>
  );
}
