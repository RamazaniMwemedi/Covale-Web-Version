import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function DatepickerForCalender({ value, handleChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          borderRadius: "15px",
          border: "1px solid #e0e0e0 ",
          margin: "1px",
        }}
      >
        <StaticDatePicker
          //   displayStaticWrapperAs="desktop"

          value={value}
          onChange={(value) => {
            handleChange(value);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
}
