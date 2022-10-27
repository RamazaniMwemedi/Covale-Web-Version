import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import "@fontsource/open-sans/500.css"; // Weight 500.
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/styles";
import { Avatar, IconButton } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Image from "next/image";
import StyledTreeItem from "./StyledItemRoot";

const closedMixin = (theme) => ({
  //
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(23)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(35)} + 1px)`,
    marginLeft: theme.spacing(8),
  },
  justifyContent: "spaceBetween",
  borderLeft: `2px solid ${theme.colors.background1}`,
  borderRight: `2px solid ${theme.colors.background1}`,
  backgroundColor: theme.colors.background,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "15px",
  flexShrink: 0,
  backgroundColor: theme.colors.background,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ProjectLeft({}) {
  const theme = useTheme();
  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent">
        {/* Main Box */}
        <Box>
          {/* Project box */}
          <Box
            sx={{
              backgroundColor: theme.colors.background1,
              height: "60px",
              borderTopLeftRadius: "8px",
              p: 1,
            }}
          >
            <Typography variant="h4">Projects</Typography>
          </Box>
          <br />
          <Box
            sx={{
              backgroundColor: theme.colors.background,
            }}
          >
            {/* Pinned projects */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Pinned</Typography>
              <IconButton>
                <ExpandMoreIcon />
              </IconButton>
            </Box>
            <br />
            {/* All projects */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">All Projects</Typography>
              <IconButton>
                <ExpandMoreIcon />
              </IconButton>
            </Box>
            {/* Tree */}
            <Box>
              <ProjectTrees />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

function ProjectTrees() {
  const theme = useTheme();
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: "auto",
        flexGrow: 1,
        maxWidth: 400,
        overflowY: "auto",
      }}
    >
      {array.map((project) => {
        return (
          <StyledTreeItem
            nodeId={project.id}
            label={<Label name={project.name} />}
          >
            {project.subProjects.length > 1
              ? project.subProjects.map((sub) => {
                return <StyledTreeItem nodeId={sub} label={<Label name={sub} />} />;
              })
              : null}
          </StyledTreeItem>
        );
      })}
    </TreeView>
  );
}

const Label = ({ name }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alightItems: "stretch",
        justifyContent: "flex-start",
        gap: "10px",
        p: "1px",
      }}
    >
      <Image
        src="https://material-ui.com/static/images/avatar/1.jpg"
        alt="Picture of the author"
        width={35}
        height={35}
        style={{
          borderRadius: "15px",
        }}
      />{" "}
      <Typography variant="h6">{name}</Typography>
    </Box>
  );
};

const array = [
  { id: 1, name: "Project 1", subProjects: ["Sub 1", "Sub 2"] },
  { id: 2, name: "Project 2", subProjects: ["Sub 1", "Sub 2"] },
  { id: 3, name: "Project 3", subProjects: [] },
];
