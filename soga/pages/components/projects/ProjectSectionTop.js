import Box from "@mui/material/Box";
import { Typography, IconButton } from "@mui/material/";
import { useTheme } from "@mui/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const ProjectSectionTop = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        witdth: "100vw",
        backgroundColor: theme.colors.background1,
        p: 1,
      }}
    >
      {/* First Box  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Project name */}
        <Box sx={{ display: "flex", gap: 1,p:0.3 }}>
          <Box
            sx={{
              height: 35,
              width: 35,
              borderRadius: 2,
              border: "4px solid dodgerblue",
            }}
          />
          <Typography variant="h5">Project Name</Typography>
        </Box>
        {/* Shortcuts and options */}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <IconButton>
            <SearchRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <PushPinRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <ChatBubbleRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <MoreVertRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      {/* Second Box  */}
      <Box sx={{ display: "flex", gap: "10px" }}>
        {/* Sub projects */}
        <Typography variant="body2">Sub 1</Typography>
        <Typography variant="body2">Sub 2</Typography>
        <Typography variant="body2">Sub 3</Typography>
      </Box>
      {/* Third Box */}
      <Box></Box>
    </Box>
  );
};

export default ProjectSectionTop;
