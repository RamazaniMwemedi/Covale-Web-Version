import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
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
    case "MENU":
      return <Menu />;
    default:
      break;
  }
};

export default TeamSectionRight;

const Participant = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: theme.colors.background1,
        height: "100vh",
        borderTopRightRadius:  "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px",
        }}
      >
        <Typography variant="h3">Participant</Typography>
      </Box>
      <br />
      <Directors />
      <AllMembers />
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
        borderTopRightRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px",
        }}
      >
        <Typography variant="h3">Menu</Typography>
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
      </Box>
      <Box>
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
        <Typography variant="h5">Media</Typography>
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
      <Typography variant="h5">Events</Typography>
    </Box>
  );
};

// Sub Component

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
        <Typography color="secondary" variant="h6">
          Photos{"  "}
        </Typography>
        <Typography color="action" variant="subtitle2">
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
        <Typography color="secondary" variant="h6">
          Videos{"  "}
        </Typography>
        <Typography color="action" variant="subtitle2">
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
      <Typography color="secondary" variant="h6">
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
      <Typography color="secondary" variant="h6">
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

// Directors
const Directors = () => {
  const directors = useSelector((state) => state.team.team.directors);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Directors</Typography>
        <Typography variant="subtitle1">{directors.length}</Typography>
      </Box>

      <List>
        {directors.map((director) => (
          <ListItem key={director.id}>
            {" "}
            <ParticipantItem participant={director} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const AllMembers = () => {
  const members = useSelector((state) => state.team.team.members);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Members</Typography>
        <Typography variant="subtitle1">{members.length}</Typography>
      </Box>
      <List>
        {members.map((member) => (
          <ListItem key={member.id}>
            {" "}
            <ParticipantItem participant={member} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

// Participant Comonents
const ParticipantItem = ({ participant }) => {
  const theme = useTheme();
  return (
    <ListItemButton
      sx={{
        display: "flex",
        width: "100%",
        gap: "10px",
        borderRadius: "8px",
        backgroundColor: (theme.vars || theme).palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Avatar>{`${participant.firstname[0]}${participant.lastname[0]}`}</Avatar>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Typography vatiant="subtitle1">{participant.firstname}</Typography>
        <Typography vatiant="subtitle1">{participant.lastname}</Typography>
      </Box>
    </ListItemButton>
  );
};
