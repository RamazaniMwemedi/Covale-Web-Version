import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AddEvent = ({ hideAddEventHandler, clickedDay }) => {
  const date = new Date(clickedDay);

  return (
    <Box
      sx={{
        backgroundColor: "pink",
        width: "400px",
        height: "550px",
        position: "absolute",
        marginLeft: "50px",
        marginTop: "80px",
        borderRadius: "10px",
      }}
    >
      {/* Top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2">Add Event</Typography>
        <Button
          variant="contained"
          onClick={() => {
            hideAddEventHandler();
          }}
        >
          Close
        </Button>
        {/* Mid */}

      </Box>
      {clickedDay && <Typography variant="h5">{clickedDay.toString()}</Typography>}
    </Box>
  );
};

export default AddEvent;
