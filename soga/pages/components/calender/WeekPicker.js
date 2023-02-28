import React, { useState } from "react";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import { Box, Button, IconButton, Typography } from "@mui/material";

const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: 1,
    alignItems: "center",
  },
  weekPicker: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
  },
});

const WeekPicker = ({
  selectedDate,
  handleDateChange,
  handlePrevWeek,
  handleNextWeek,
}) => {
  const classes = useStyles();
  // const [currentDate, setCurrentDate] = useState(selectedDate);

  // const handlePrevWeek = () => {
  //   setCurrentDate(moment(currentDate).subtract(1, "week"));
  //   onDateChange(moment(currentDate).subtract(1, "week"));
  // };

  // const handleNextWeek = () => {
  //   setCurrentDate(moment(currentDate).add(1, "week"));
  //   onDateChange(moment(currentDate).add(1, "week"));
  // };

  return (
    <>
      {selectedDate && (
        <Box className={classes.root}>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            sx={{
              borderRadius: "5px",
              padding: "5px 10px",
              textTransform: "none",
            }}
            onClick={() => handleDateChange(moment())}
          >
            Today
          </Button>
          <Box className={classes.weekPicker}>
            <IconButton
              onClick={() => {
                handlePrevWeek(selectedDate);
              }}
            >
              {"<"}
            </IconButton>
            <Typography variant="h5">
              {selectedDate.format("MMMM YYYY")}
            </Typography>
            <IconButton
              onClick={() => {
                handleNextWeek(selectedDate);
              }}
            >
              {">"}
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default WeekPicker;
