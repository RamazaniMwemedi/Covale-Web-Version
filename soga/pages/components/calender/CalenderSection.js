import { Box } from "@mui/system";
import { useTheme } from "@mui/styles";
import CalendarSectionLeft from "./CalendarSectionLeft";
import CalendarSectionRight from "./CalendarSectionRight";

export default function CalendarSection({ handleChange, value }) {
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
        <CalendarSectionLeft handleChange={handleChange} value={value} />
      </Box>
      <Box
        sx={{
          flex: "35%",
        }}
      >
        <CalendarSectionRight value={value} />
      </Box>
    </Box>
  );
}
