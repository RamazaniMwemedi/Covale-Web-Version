import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import React from "react";
import { useSelector } from "react-redux";

const TeamSectionRight = ({ option }) => {
  switch (option) {
    case "PARTICIPANT":
      return <Participant />;
      break;
    case "MENU":
      return <Menu />;
    default:
      break;
  }
};

export default TeamSectionRight;

const Participant = () => {
  return (
    <Box>
      <Typography variant="h3">Participant</Typography>
    </Box>
  );
};
const Menu = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: theme.colors.background1,
        height: "100vh",
      }}
    >
      <IconButton
        sx={{
          position: "fixed",
          top: "1",
          right: "0",
          margin: "5px",
          backgroundColor: theme.colors.itemBackground,
          "&:hover": {
            backgroundColor: theme.colors.background2,
          },
        }}
      >
        <MoreHorizIcon color="secondary" />
      </IconButton>
      <Box>
        <br />
        <br />
        <br />
      </Box>
      <Media />
      <Events />
    </Box>
  );
};

const Media = () => {
  const team = useSelector((state) => state.team.team);
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: theme.colors.background1,
          padding: "10px",
        }}
      >
        <Typography variant="h4">Media</Typography>
      </Box>
      <Box>
        {/* Photos */}
        <Photos photos={team.photos} />
        {/* Videos */}
        <Videos videos={team.videos} />
        {/* Links */}
        <Links />
        {/* Documents */}
        <Documents />
      </Box>
    </>
  );
};

const Events = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.colors.background1,
        padding: "10px",
      }}
    >
      <Typography variant="h4">Events</Typography>
    </Box>
  );
};

// Media components
const Photos = ({ photos }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Typography color="secondary" variant="h5">
          Photos{"  "}
        </Typography>
        <Typography color="action" variant="subtitle1">
          {photos.length}
        </Typography>
      </Box>
      <IconButton
        sx={{
          backgroundColor: theme.colors.itemBackground,
          "&:hover": {
            backgroundColor: theme.colors.background2,
          },
        }}
      >
        <ExpandMoreRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
const Videos = ({ videos }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Typography color="secondary" variant="h5">
          Videos{"  "}
        </Typography>
        <Typography color="action" variant="subtitle1">
          {videos.length}
        </Typography>
      </Box>
      <IconButton
        sx={{
          backgroundColor: theme.colors.itemBackground,
          "&:hover": {
            backgroundColor: theme.colors.background2,
          },
        }}
      >
        <ExpandMoreRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
const Links = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <Typography color="secondary" variant="h5">
        Links
      </Typography>
      <IconButton
        sx={{
          backgroundColor: theme.colors.itemBackground,
          "&:hover": {
            backgroundColor: theme.colors.background2,
          },
        }}
      >
        <ExpandMoreRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
const Documents = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <Typography color="secondary" variant="h5">
        Documents
      </Typography>
      <IconButton
        sx={{
          backgroundColor: theme.colors.itemBackground,
          "&:hover": {
            backgroundColor: theme.colors.background2,
          },
        }}
      >
        <ExpandMoreRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
