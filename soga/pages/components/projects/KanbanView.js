import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { Typography } from "@mui/material";

const heights = [
  150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

const Item = ({ height, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "whitesmoke",
        height: "auto",
      }}
    >
      {children}
    </Box>
  );
};

const KanbanView = ({ taskViewValue }) => {
  return (
    <Box
      sx={{
        width: "74vw",
        ml: 0.5,
        minHeight: 393,
        // backgroundColor: "red",
        // display: "flex",
      }}
    >
      <Masonry
        columns={3}
        spacing={2}
        defaultHeight={400}
        defaultColumns={3}
        defaultSpacing={1}
        sx={{ width: "100%" }}
      >
        {heights.map((height, index) => (
          <Item key={index} sx={{ height }}>
            {index + 1}
          </Item>
        ))}
      </Masonry>
    </Box>
  );
};

export default KanbanView;

