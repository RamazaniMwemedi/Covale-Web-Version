import * as React from "react";
import { Box, Typography } from "@mui/material";
import AddEvent from "./AddEvent";
import { useTheme } from "@mui/styles";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import CalendarTop from "./CalendarTop";

export default function CalendaeSectionLeft({
  handleDateChange,
  selectedDate,
  handleViewChange,
  handlePrevWeek,
  handleNextWeek,
  handlePrevDay,
  handleNextDay,
  view
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.background1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          // padding: "10px",
          flex: "0.8",
          height: "97vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fafafa",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <CalendarTop handleViewChange={handleViewChange} view={view} />
        </Box>
        {view === "day" && (
          <DayView
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            handleNextDay={handleNextDay}
            handlePrevDay={handlePrevDay}
          />
        )}
        {view === "week" && (
          <WeekView
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            handleNextWeek={handleNextWeek}
            handlePrevWeek={handlePrevWeek}
          />
        )}
        {view === "month" && (
          <MonthView
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        )}
      </Box>
    </Box>
  );
}
