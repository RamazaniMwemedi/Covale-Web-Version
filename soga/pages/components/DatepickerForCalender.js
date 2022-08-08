import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
export default function DatepickerForCalender({ value, handleChange }) {
  const theme = useTheme();
  return (
    <LocalizationProvider
      sx={{
        backgroundColor: theme.colors.background1,
      }}
      dateAdapter={AdapterDateFns}
    >
      <Box
        sx={{
          borderRadius: "15px",
          border: `1px solid ${theme.colors.border}`,
          margin: "1px",
        }}
      >
        <StaticDatePicker
          //   displayStaticWrapperAs="desktop"
          color="secondary"
          value={value}
          onChange={(value) => {
            handleChange(value);
          }}
          sx={{
            backgroundColor: theme.colors.background1,
          }}
          renderInput={(params) => (
            <TextField
              sx={{
                backgroundColor: theme.colors.background1,
              }}
              {...params}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}
