import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import CalendarViewDayRoundedIcon from "@mui/icons-material/CalendarViewDayRounded";
import ViewWeekRoundedIcon from "@mui/icons-material/ViewWeekRounded";
import CalendarViewMonthRoundedIcon from "@mui/icons-material/CalendarViewMonthRounded";
import { EventRounded } from "@mui/icons-material";

const CalendarTop = ({ handleViewChange, view }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Button
        sx={{
          borderRadius: "5px",
          padding: "5px 10px",
          textTransform: "none",
          gap: 1,
        }}
        variant="contained"
      >
        <EventRounded size="small" />
        Add New Event
      </Button>
      <Button
        sx={{
          borderRadius: "5px",
          padding: "5px 10px",
          textTransform: "none",
          gap: 1,

          border: view === "day" ? "1px solid purple" : "",
        }}
        onClick={() => handleViewChange("day")}
        size="small"
        variant="contained"
        color={view === "day" ? "secondary" : "inherit"}
      >
        <CalendarViewDayRoundedIcon size="small" />
        Day
      </Button>
      <Button
        sx={{
          borderRadius: "5px",
          padding: "5px 10px",
          textTransform: "none",
          gap: 1,

          border: view === "week" ? "1px solid purple" : "",
        }}
        onClick={() => handleViewChange("week")}
        size="small"
        variant="contained"
        color={view === "week" ? "secondary" : "inherit"}
      >
        <ViewWeekRoundedIcon />
        Week
      </Button>
      <Button
        sx={{
          borderRadius: "5px",
          padding: "5px 10px",
          textTransform: "none",
          gap: 1,
          border: view === "month" ? "1px solid purple" : "",
        }}
        variant="contained"
        onClick={() => handleViewChange("month")}
        size="small"
        color={view === "month" ? "secondary" : "inherit"}
      >
        <CalendarViewMonthRoundedIcon />
        Month
      </Button>
    </Box>
  );
};

CalendarTop.propTypes = {
  handleViewChange: PropTypes.func.isRequired,
};

export default CalendarTop;
