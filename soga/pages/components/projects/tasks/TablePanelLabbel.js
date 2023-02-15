import { Box, Typography } from "@mui/material/";
import TableViewRoundedIcon from "@mui/icons-material/TableViewRounded";
import { useTheme } from "@mui/styles";

const TablePanelLabbel = ({ value }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.colors.background1,
        // p: 0.6,
        borderRadius: 2,
        color: value === "table" ? "#9c27b0" : "GrayText",
      }}
    >
      <TableViewRoundedIcon fontSize="small" />{" "}
      <Typography variant="subtitle2">Table</Typography>
    </Box>
  );
};

export default TablePanelLabbel;
