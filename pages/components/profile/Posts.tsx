import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import PostLeft from "./PostLeft";
import PostRight from "./PostRight";

const Posts = () => {
  const theme = useTheme();
  const isSmallPcView = useMediaQuery(() => theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        display: isSmallPcView ? "block" : "flex",
        gap: 10,
        // width: "98%",
        ml: 7,
        placeContent: "center",
      }}
    >
      {/* Post Left */}
      <Box
        sx={{
          flex: isSmallPcView ? 1 : 0.35,
        }}
      >
        <PostLeft />
      </Box>
      {/* Post Right */}
      <Box
        sx={{
          flex: isSmallPcView ? 1 : 0.65,
          p: 10,
          pt: 1,
        }}
      >
        <PostRight />
      </Box>
    </Box>
  );
};

export default Posts;
