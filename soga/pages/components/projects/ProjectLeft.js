import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import "@fontsource/open-sans/500.css"; // Weight 500.
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/styles";
import { Avatar, IconButton, Button } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Image from "next/image";
import StyledTreeItem from "./StyledItemRoot";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import NewProject from "./NewProject";
import NewSubProject from "./NewSubProject";

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
  borderRight: `1px solid darkgray`,
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

export default function ProjectLeft() {
  const projectStore = useSelector((state) => state.projects);
  const theme = useTheme();
  const [showPinnedProjects, setShowPinnedProjects] = React.useState(true);
  const [showAllProjects, setShowAllProjects] = React.useState(true);
  return (
    <Box
      sx={{
        width: `calc(${theme.spacing(34.9)} + 1px)`,
      }}
    >
      <CssBaseline />
      <Drawer variant="permanent">
        {/* Main Box */}

        <Box
          sx={{
            // backgroundColor: theme.colors.background1,
            // height: "100vh",
            // No scrallbar
            overflow: "hidden",
          }}
        >
          {/* Project box */}
          <Box
            sx={{
              // backgroundColor: theme.colors.background1,
              height: "60px",
              borderTopLeftRadius: "8px",
              p: 1,
              display: "flex",
              gap: "10px",
            }}
          >
            <AssessmentRoundedIcon
              sx={{
                fontSize: "45px",
              }}
              color="secondary"
            />
            <Typography variant="h4">Projects</Typography>
          </Box>
          <br />
          <Box>
            {/* Pinned projects */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Pinned</Typography>
              <IconButton
                onClick={() => {
                  setShowPinnedProjects(!showPinnedProjects);
                }}
              >
                {showPinnedProjects ? (
                  <ExpandLessRoundedIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            </Box>
            <br />
            {/* All projects */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">All Projects</Typography>
              <IconButton
                onClick={() => {
                  setShowAllProjects(!showAllProjects);
                }}
              >
                {showAllProjects ? (
                  <ExpandLessRoundedIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            </Box>
            <br />
            <Box>
              {/* Tree */}
              <Box
                sx={{
                  // a list of elements that will be scrolled
                  // overflow: "auto",
                  height: "100%",
                  maxHeight: "100%",
                  width: "100%",
                  maxWidth: "100%",
                  // position: "relative",
                  // display: "flex",
                  // flexDirection: "column",
                  // alignItems: "stretch",
                  // justifyContent: "flex-start",
                  // gap: "10px",
                  // padding: "10px",
                  // backgroundColor: theme.colors.background1,
                  // borderRadius: "8px",
                  // border: "1px solid darkgray",
                }}
              >
                {showAllProjects ? (
                  projectStore.projects ? (
                    <ProjectTrees projects={projectStore.projects} />
                  ) : (
                    "Loading ..."
                  )
                ) : null}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* New Project */}
        <NewProject />
      </Drawer>
    </Box>
  );
}

function ProjectTrees({ projects }) {
  const router = useRouter();
  const theme = useTheme();
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: "650px",
        flexGrow: 1,
        maxWidth: 400,
        // scrallbar
        overflow: "auto",
      }}
    >
      {projects.length > 0 ? (
        projects.map((project) => {
          return (
            <StyledTreeItem
              key={project.id}
              nodeId={project.id}
              label={<ProjectLabel name={project.title} />}
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/projects/?project=${project.id}`,
                  `/projects/${project.id}`,
                  {
                    shallow: true,
                  }
                );
              }}
              sx={{
                backgroundColor: theme.colors.background1,
                color: "white",
                m: 0.4,
                borderRadius: 2,
              }}
            >
              {project.subProjects.length > 0 ? (
                project.subProjects.map((sub) => {
                  return (
                    <StyledTreeItem
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(
                          `/projects/?project=${project.id}&subproject=${sub.id}`,
                          `/projects/${project.id}/${sub.id}`,
                          {
                            shallow: true,
                          }
                        );
                      }}
                      key={sub.id}
                      nodeId={sub.id}
                      label={<SubProject name={sub.title} />}
                    />
                  );
                })
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80%",
                    width: "100%",
                    borderRadius: "8px",
                    p: 1,
                  }}
                >
                  <Typography variant="body1">No Sub projects</Typography>
                  <Box>
                    <Typography variant="caption">
                      Click the button below to
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      create a new sub project.
                    </Typography>
                  </Box>
                  <NewSubProject
                    project={{
                      id: project.id,
                      title: project.title,
                    }}
                  />
                </Box>
              )}
            </StyledTreeItem>
          );
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            // backgroundColor: theme.colors.textBackground,
            borderRadius: "8px",
            p: 1,
          }}
        >
          <Typography variant="h6">No Projects</Typography>
          <br />
          <Box>
            <Typography variant="subtitle1">
              Click the "New Project" button
            </Typography>
            <Typography variant="subtitle1">
              below to create a new project.
            </Typography>
          </Box>
        </Box>
      )}
    </TreeView>
  );
}

const ProjectLabel = ({ name }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alightItems: "stretch",
        justifyContent: "space-between",
        gap: "10px",
        p: "1px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alightItems: "stretch",
          gap: "10px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            height: 15,
            width: 15,
            borderRadius: 1,
            border: "2px solid dodgerblue",
          }}
        />
        <Typography variant="body1">{name}</Typography>
      </Box>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};

const SubProject = ({ name }) => {
  return (
    <Typography
      sx={{
        ml: 5,
      }}
      variant="body2"
    >
      {name}
    </Typography>
  );
};
