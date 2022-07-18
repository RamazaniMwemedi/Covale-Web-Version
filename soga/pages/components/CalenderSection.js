import { Box } from "@mui/system";
import CalendarSectionLeft from "./CalendarSectionLeft";
import CalendarSectionRight from "./CalendarSectionRight";

export default function CalendarSection({ handleChange, value }) {
  return (
    <Box
      sx={{
        height: "100%",
        marginLeft:"-66px",
        display:"flex",
        backgroundColor:"white",
        flex:1
      }}
    >
      <CalendarSectionLeft handleChange={handleChange} value={value} />
      <CalendarSectionRight value={value} />
    </Box>
  );
}
