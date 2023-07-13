import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import "@fontsource/open-sans/500.css"; // Weight 500.
import {
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";
import {
  BookMarkIcon,
  EventIcon,
  OrganizationIcon,
  PostIcon,
} from "../../../assets/Icons";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { ThemeInterface } from "../../../interfaces/myprofile";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: { theme?: any; open?: boolean }) => ({
  width: "15px",
  flexShrink: 0,
  // backgroundColor: theme.colors.background,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(!open && {
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
    p: 10,
    "& .MuiDrawer-paper": {
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
      p: 10,
    },
  }),
}));

export default function WorktLeft({}) {
  const [showOrganizations, setShowOrganizations] = useState(false);
  const [postBgcolor, setPostBgcolor] = useState("");
  const [eventBgcolor, setEventBgcolor] = useState("");
  const [savedBgcolor, setSavedBgcolor] = useState("");
  const pathname = usePathname();
  const theme: ThemeInterface = useTheme();

  useEffect(() => {
    switch (pathname) {
      case "/work":
        setPostBgcolor(theme.colors.background1);
        setEventBgcolor("");
        setSavedBgcolor("");
        break;
      case "/work/event":
        setPostBgcolor("");
        setEventBgcolor(theme.colors.background1);
        setSavedBgcolor("");
        break;
      case "/work/saved":
        setPostBgcolor("");
        setEventBgcolor("");
        setSavedBgcolor(theme.colors.background1);
        break;

      default:
        break;
    }
    return () => {
      setPostBgcolor("");
      setEventBgcolor("");
      setSavedBgcolor("");
    };
  }, [pathname]);

  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent">
        <Box>
          <Box p={1}>
            <Typography variant="h4">Work</Typography>
          </Box>
          <Box>
            <List
              sx={{
                p: 0.5,
              }}
            >
              <ListItemButton
                sx={{
                  bgcolor: postBgcolor,
                  borderRadius: 2,
                  mt: 0.3,
                }}
              >
                <ListItemIcon>
                  <PostIcon width={25} height={25} />
                </ListItemIcon>
                <Typography>Posts</Typography>
              </ListItemButton>
              <ListItemButton
                sx={{
                  bgcolor: eventBgcolor,
                  borderRadius: 2,
                  mt: 0.3,
                }}
              >
                <ListItemIcon>
                  <EventIcon width={25} height={25} />
                </ListItemIcon>
                <Typography>Events</Typography>
              </ListItemButton>
              <ListItemButton
                sx={{
                  bgcolor: savedBgcolor,
                  borderRadius: 2,
                  mt: 0.3,
                }}
              >
                <ListItemIcon>
                  <BookMarkIcon width={25} height={25} />
                </ListItemIcon>
                <Typography>Saved</Typography>
              </ListItemButton>
            </List>
            <br />
            <Divider />
            <List
              sx={{
                p: 0.5,
              }}
            >
              <ListItemButton
                sx={{
                  borderRadius: 2,
                }}
                onClick={() => setShowOrganizations((p) => !p)}
              >
                <ListItemIcon>
                  <>
                    {showOrganizations ? (
                      <KeyboardArrowUpRoundedIcon />
                    ) : (
                      <KeyboardArrowDownRoundedIcon />
                    )}
                    <OrganizationIcon width={25} height={25} />
                  </>
                </ListItemIcon>
                <Typography>Organizations</Typography>
              </ListItemButton>
              {showOrganizations && (
                <Box p={1}>
                  <Typography variant="body2">
                    No Organization at The Moment
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      textTransform: "none",
                      width: "100%",
                    }}
                    endIcon={<AddRoundedIcon />}
                  >
                    Create Organization
                  </Button>
                </Box>
              )}
            </List>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
