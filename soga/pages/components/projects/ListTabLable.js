import { Box, Typography } from "@mui/material/";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { useTheme } from "@mui/styles";

const ListPanelLable = ({ value }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.colors.background1,
        p: 0.6,
        borderRadius: 2,
        color: value === "list" ? "#9c27b0" : "GrayText",
      }}
    >
      <FormatListBulletedRoundedIcon fontSize="small" />{" "}
      <Typography variant="subtitle2">List</Typography>
    </Box>
  );
};

export default ListPanelLable;
