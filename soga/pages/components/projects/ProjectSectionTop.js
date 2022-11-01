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

const ProjectSectionTop = ({ valueChangeHandler, value, project }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        witdth: "90vw",
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
          <Typography variant="h5">{project.title}</Typography>
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
          {project.subProjects.map((subProject) => (
            <Typography>{subProject.title} </Typography>
          ))}
          {/* <Typography>Sub 1</Typography>
          <Typography>Sub 2</Typography>
          <Typography>Sub 3</Typography> */}
        </Breadcrumbs>
      </Box>
      {/* Third Box */}
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
            // gap: 2,

            alightItems: "stretch",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <ProjectTopTabs
            valueChangeHandler={valueChangeHandler}
            value={value}
          />
        </Box>
        {/* Right */}
        <Box>
          <TotalAvatars valueChangeHandler={valueChangeHandler} value={value} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectSectionTop;

function ProjectTopTabs({ valueChangeHandler, value }) {
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Tabs
        value={value}
        onChange={valueChangeHandler}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab
          value="Tasks"
          label={<Typography>Tasks</Typography>}
          sx={{ textTransform: "none" }}
        />
        <Tab
          value="Overview"
          label={<Typography>Overview</Typography>}
          sx={{ textTransform: "none" }}
        />
      </Tabs>
    </Box>
  );
}

function TotalAvatars({ valueChangeHandler, value }) {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tabs
        value={value}
        onChange={valueChangeHandler}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab
          value="Members"
          label={
            <AvatarGroup
              sx={{
                // height: "24px",
                // width: "24px",
                "& .MuiAvatar-root": { width: 30, height: 30, fontSize: 10 },
              }}
              total={24}
            >
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
          }
          sx={{ textTransform: "none" }}
        />
      </Tabs>
      <Divider orientation="vertical" sx={{ width: "1px" }} flexItem />
      <IconButton>
        <PersonAddAlt1RoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
