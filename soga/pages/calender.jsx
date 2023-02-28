import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/styles";
// My Modules
import DrawerComponent from "./components/others/DrawerComponent";
import CalenderLeft from "./components/calender/CalenderLeft";
import CalenderSection from "./components/calender/CalenderSection";
import Moment from "moment";

export default function Calendar() {
  const theme = useTheme();
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(Moment());

  // Events
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const selectEventHandler = (event) => setSelectedEvent(event);
  const removeEvent = () => setSelectedEvent(null);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handlePrevWeek = (currentDate) => {
    setSelectedDate(Moment(currentDate).subtract(1, "week"));
  };

  const handleNextWeek = (currentDate) => {
    setSelectedDate(Moment(currentDate).add(1, "week"));
  };
  const handlePrevDay = (currentDate) => {
    setSelectedDate(Moment(currentDate).subtract(1, "week"));
  };

  const handleNextDay = (currentDate) => {
    setSelectedDate(Moment(currentDate).add(1, "week"));
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <DrawerComponent />
      <CalenderLeft handleDateChange={handleDateChange} value={selectedDate} />
      <Box component="main" sx={{ display: "flex", height: "100%" }}>
        {/* App will start here */}
        <CalenderSection
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          handleViewChange={handleViewChange}
          handlePrevWeek={handlePrevWeek}
          handleNextWeek={handleNextWeek}
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
          view={view}
          // Events
          events={events}
          selectedEvent={selectedEvent}
          selectEventHandler={selectEventHandler}
          removeEvent={removeEvent}
        />
      </Box>
    </Box>
  );
}
