import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function FloatingActionButtonSize({ buttonHandler }) {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
        position: "fixed",
        bottom: 10,
        left: 270,
        zIndex: 1,
      }}
      onClick={() => {
        buttonHandler();
      }}
    >
      <Fab color="secondary" aria-label="add">
        <AddIcon
          sx={{
            width: "25px",
            height: "25px",
          }}
        />
      </Fab>
    </Box>
  );
}
