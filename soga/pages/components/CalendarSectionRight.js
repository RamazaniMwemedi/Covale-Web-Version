import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTheme } from "@mui/styles";
const CalendarSectionRight = () => {
  const theme = useTheme();
  return (
    <Box sx={{
      backgroundColor: theme.colors.background1,
      width:"100%"
    }}>
      <Typography variant="h4">Events</Typography>
    </Box>
  );
};

export default CalendarSectionRight;
