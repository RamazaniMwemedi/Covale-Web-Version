import Box from "@mui/material/Box";
import { Typography, IconButton, Divider } from "@mui/material/";
import { useTheme } from "@mui/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";

const ProjectSectionTop = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        witdth: "100vw",
        backgroundColor: theme.colors.background1,
        pt: 1,
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
        <Box sx={{ display: "flex", gap: 1, p: 0.3 }}>
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
      <Box sx={{ display: "flex", gap: "10px", ml: 7 }}>
        {/* Sub projects */}
        <Breadcrumbs aria-label="breadcrumb">
          {/* <Link underline="hover" color="inherit" href="/">
          </Link> */}
          <Typography>Sub 1</Typography>
          <Typography>Sub 2</Typography>
          <Typography>Sub 3</Typography>
        </Breadcrumbs>
      </Box>
      {/* Third Box */}
      <br/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left */}
        <Box
          sx={{
            display: "flex",
            gap: 2,

            alightItems: "stretch",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <ColorTabs />
          {/* <Typography>Tasks</Typography>
          <Typography>Overview</Typography> */}
        </Box>
        {/* Right */}
        <Box>
          <TotalAvatars />
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectSectionTop;

function ColorTabs() {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="Tasks" label="Tasks" />
        <Tab value="Overview" label="Overview" />
      </Tabs>
    </Box>
  );
}

function TotalAvatars() {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <AvatarGroup
        sx={{
          // height: "24px",
          // width: "24px",
          "& .MuiAvatar-root": { width: 35, height: 35, fontSize: 15 },
        }}
        total={24}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://mui.com/static/images/avatar/1.jpg"
        />
        <Avatar
          alt="Travis Howard"
          src="https://mui.com/static/images/avatar/2.jpg"
        />
        <Avatar
          alt="Agnes Walker"
          src="https://mui.com/static/images/avatar/4.jpg"
        />
        <Avatar
          alt="Trevor Henderson"
          src="https://mui.com/static/images/avatar/5.jpg"
        />
      </AvatarGroup>
      <Divider orientation="vertical" sx={{ width: "1px" }} flexItem />
      <IconButton>
        <PersonAddAlt1RoundedIcon />
      </IconButton>
    </Box>
  );
}
