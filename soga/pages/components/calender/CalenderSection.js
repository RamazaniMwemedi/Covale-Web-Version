import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";
import CalendarSectionLeft from "./CalendarSectionLeft";
import CalendarSectionRight from "./CalendarSectionRight";

export default function CalendarSection({
  handleDateChange,
  selectedDate,
  handleViewChange,
  handlePrevWeek,
  handleNextWeek,
  handlePrevDay,
  handleNextDay,
  view,
  // Event
  events,
  selectedEvent,
  selectEventHandler,
  removeEvent,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        marginLeft: "-66px",
        display: "flex",
        backgroundColor: theme.colors.background1,
        flex: 1,
      }}
    >
      <Box
        sx={{
          flex: "65%",
        }}
      >
        <CalendarSectionLeft
          view={view}
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          handleViewChange={handleViewChange}
          handlePrevWeek={handlePrevWeek}
          handleNextWeek={handleNextWeek}
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
        />
      </Box>
      <Box
        sx={{
          flex: "35%",
        }}
      >
        {/* Events */}
        <CalendarSectionRight
          selectedDate={selectedDate}
          events={events}
          selectedEvent={selectedEvent}
          selectEventHandler={selectEventHandler}
          removeEvent={removeEvent}
        />
      </Box>
    </Box>
  );
}
