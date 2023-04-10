import React from "react";
import DrawerComponent from "../components/others/DrawerComponent";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import LoadingLogo from "../components/others/LoadingLogo";
import { useTheme } from "@mui/styles";
import {
  AppBar,
  Button,
  CssBaseline,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

import { useCheckLogedinUser } from "../../hooks/hooks";
import UserCard from "../components/profile/UserCard";
import Image from "next/image";
import { purple } from "@mui/material/colors";

import SwipeableViews from "react-swipeable-views";
import { element } from "prop-types";
import Posts from "../components/profile/Posts";

const MyAccount = () => {
  const userLoading = useCheckLogedinUser();

  interface RootState {
    user: {
      user: {
        name: string;
        email: string;
      };
    };
  }
  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore ? userStore.user : null;
  const theme: any = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box>
      {userLoading ? (
        <LoadingLogo />
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            backgroundColor: theme.colors.background,
          }}
        >
          <CssBaseline />
          {userStore ? (
            <>
              <DrawerComponent />
              {/* Body */}
              <Box
                sx={{
                  width: "100vw",
                }}
              >
                {/* Top */}
                <Box
                  sx={{
                    bgcolor: theme.colors.background1,
                  }}
                >
                  <Box
                    sx={{
                      ml: 7,
                      width: "90%",
                    }}
                  >
                    {/* Cover image  */}
                    <Box
                      sx={{
                        position: "relative",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Image
                        src={
                          "https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        }
                        alt="Cover photo"
                        width={1000}
                        height={300}
                        objectFit="cover"
                        style={{
                          width: "96%",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}
                      />
                      <Button
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 30,
                          height: "30px",
                          textTransform: "unset",
                          display: "flex",
                          bgcolor: purple[500],
                          gap: 1,
                        }}
                        variant="contained"
                        size="small"
                        color="secondary"
                      >
                        <CameraAltRoundedIcon fontSize="small" /> Edit cover
                        photo
                      </Button>
                    </Box>

                    {/* User card */}
                    <Box
                      sx={{
                        ml: 7,
                        mt: -6,
                      }}
                    >
                      <UserCard user={user} />
                    </Box>
                  </Box>
                </Box>
                {/* Tabs */}
                <Box
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    ml: 7,
                    width: "90%",
                  }}
                >
                  <FullWidthTabs
                    value={value}
                    handleChange={handleChange}
                    handleChangeIndex={handleChangeIndex}
                  />
                </Box>
                {/* Contents  */}
                <Contents value={value} handleChangeIndex={handleChangeIndex} />
              </Box>
            </>
          ) : (
            <LoadingLogo />
          )}
        </Box>
      )}
    </Box>
  );
};

export default MyAccount;

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface FullWidthTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  handleChangeIndex: (index: number) => void;
}

function FullWidthTabs({ value, handleChange }: FullWidthTabsProps) {
  const theme: any = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: theme.colors.background,
        alignItems: "center",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        aria-label="Contents Tab"
      >
        <Tab
          sx={{ textTransform: "unset", borderRadius: 10 }}
          label="Posts"
          {...a11yProps(0)}
        />
        <Tab sx={{ textTransform: "unset" }} label="About" {...a11yProps(1)} />
        <Tab
          sx={{ textTransform: "unset" }}
          label="Connections"
          {...a11yProps(2)}
        />
        <Tab sx={{ textTransform: "unset" }} label="Teams" {...a11yProps(3)} />
        <Tab sx={{ textTransform: "unset" }} label="Files" {...a11yProps(4)} />
      </Tabs>
      <Box>Menu</Box>
    </Box>
  );
}
interface ContentsProps {
  value: number;
  handleChangeIndex: (index: number) => void;
}
const Contents = ({ value, handleChangeIndex }: ContentsProps) => {
  const theme: any = useTheme();
  return (
    <SwipeableViews
      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
      index={value}
      onChangeIndex={handleChangeIndex}
    >
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Posts />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        About
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Connections
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        Teams
      </TabPanel>
      <TabPanel value={value} index={4} dir={theme.direction}>
        Files
      </TabPanel>
    </SwipeableViews>
  );
};
