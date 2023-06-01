import React from "react";
import { Box } from "@mui/system";
import PostLeft from "./PostLeft";
import PostRight from "./PostRight";

const Posts = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "40% 60%", // set explicit column widths
        gridTemplateRows: "auto", // set the row height to auto
        gap: "1rem",
        width: "90%",
        ml: 7,
        "@media screen and (max-width: 1400px)": {
          gridTemplateColumns: "repeat(auto-fit, minmax(100%, 1fr))",
          placeItems: "center",
        },
      }}
    >
      {/* Post Left */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        <PostLeft />
      </Box>
      {/* Post Right */}
      <Box
        sx={{
          width: "70%",
        }}
      >
        <PostRight />
      </Box>
    </Box>
  );
};

export default Posts;
