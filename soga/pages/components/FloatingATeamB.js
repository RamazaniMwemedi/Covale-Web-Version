import GroupAddIcon from "@mui/icons-material/GroupAdd";
import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

export default function FloatingATeamB({ toggleShowTeam }) {
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
        toggleShowTeam();
      }}
    >
      <Fab color="secondary" aria-label="add">
        <GroupAddIcon
          sx={{
            width: "25px",
            height: "25px",
          }}
        />
      </Fab>
    </Box>
  );
}
