import { Box } from "@mui/material";
import React from "react";

const AddMoreFriends = ({ closeMorePeopleHandler }) => {
  return (
    <Box
      sx={{
        height: "400px",
        width: "280px",
        position: "fixed",
        bottom: 0,
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        blur: "5px",
      }}
    >
      <button
        onClick={() => {
          closeMorePeopleHandler();
        }}
      >
        Close
      </button>
    </Box>
  );
};

export default AddMoreFriends;
