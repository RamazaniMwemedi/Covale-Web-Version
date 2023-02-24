import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const TeamChats = ({}) => {
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Team chats
      </Typography>
    </Box>
  );
};

TeamChats.propTypes = {};

export default TeamChats;
