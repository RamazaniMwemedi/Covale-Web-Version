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

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import InviteMembers from "./InviteMembers";

const TeamSectionRight = ({ option, team }) => {
  switch (option) {
    case "PARTICIPANT":
      return <Participant team={team} />;
    case "MENU":
      return <Menu team={team} />;
    default:
      break;
  }
};

export default TeamSectionRight;

const Participant = ({ team }) => {
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
        <Typography variant="h5">Participant</Typography>
      </Box>
      <br />
      <Directors directors={team.directors} />
      <AllMembers members={team.members} />
      <InvitedMembers teamId={team.id} />
    </Box>
  );
};
const Menu = ({ team }) => {
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
        <Typography variant="h5">Menu</Typography>
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
      <Media team={team} />
      <Events team={team} />
    </Box>
  );
};

const Media = ({ team }) => {
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
        <Typography variant="subtitle1">Media</Typography>
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
      <Typography variant="subtitle1">Events</Typography>
    </Box>
  );
};

// Sub Components

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
        <Typography color="secondary" variant="body1">
          Photos{"  "}
        </Typography>
        <Typography color="action" variant="body2">
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
        <Typography color="secondary" variant="body1">
          Videos{"  "}
        </Typography>
        <Typography color="action" variant="body2">
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
      <Typography color="secondary" variant="body1">
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
      <Typography color="secondary" variant="body2">
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
const Directors = ({ directors }) => {
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
        <Typography variant="subtitle1">Directors</Typography>
        <Typography variant="subtitle2">{directors.length}</Typography>
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

const AllMembers = ({ members }) => {
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
        <Typography variant="subtitle1">Members</Typography>
        <Typography variant="subtitle2">{members.length}</Typography>
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
      <Avatar
        sx={{
          height: "24px",
          width: "24px",
        }}
      >{`${participant.firstname[0]}`}</Avatar>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Typography variant="body2">{participant.firstname}</Typography>
        <Typography variant="body2">{participant.lastname}</Typography>
      </Box>
    </ListItemButton>
  );
};

const InvitedMembers = ({teamId}) => {
  // Show InviteMembers State
  const [showInviteMembers, setShowInviteMembers] = useState(false);
  // showInviteMembers handler
  const showInviteMembersHandler =()=>{
setShowInviteMembers(!showInviteMembers);
  }

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
        <Typography variant="subtitle1">Invited Members</Typography>
        {/* Icon for inviting new member */}
        <IconButton onClick={showInviteMembersHandler}>
          <AddCircleOutlineRounded />
        </IconButton>
      </Box>
      <List>
        {
          // Show InviteMenbers Component
          showInviteMembers && (
            <InviteMembers
              teamId={teamId}
              showInviteMembersHandler={showInviteMembersHandler}
            />
          )
        }
        <ListItem>
          <Typography variant="body2">No Invited Members</Typography>
        </ListItem>
      </List>
    </Box>
  );
};
