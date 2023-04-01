import { Box, Typography } from "@mui/material/";
import ViewKanbanRoundedIcon from "@mui/icons-material/ViewKanbanRounded";
import { useTheme } from "@mui/styles";

const KanbanLabbel = ({ value }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.colors.background1,
        p: 0.6,
        borderRadius: 2,
        color: value === "kanban" ? "#9c27b0" : "GrayText",
      }}
    >
      <ViewKanbanRoundedIcon fontSize="small" />{" "}
      <Typography variant="subtitle2">Kaban</Typography>
    </Box>
  );
};

export default KanbanLabbel;
