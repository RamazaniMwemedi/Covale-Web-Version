import React, { useState } from "react";
import DrawerComponent from "../components/others/DrawerComponent";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import LoadingLogo from "../components/others/LoadingLogo";
import { useTheme } from "@mui/styles";
import { Button, CssBaseline, Tabs, Tab, Typography } from "@mui/material";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

import {
  useCheckLogedinUser,
  useCheckLogedinUserToken,
} from "../../hooks/hooks";
import UserCard, { CropeImageDialog } from "../components/profile/UserCard";
import Image from "next/image";
import { purple } from "@mui/material/colors";

import SwipeableViews from "react-swipeable-views";
import Posts from "../components/profile/Posts";
import { addCoverPic } from "../../services/user";
import { updateCoverPhotoe } from "../../Redux/slices/user";
import Files from "../components/profile/files";
import {
  ContentsProps,
  CropperImageInterface,
  FullWidthTabsProps,
  RootState,
  TabPanelProps,
} from "../../interfaces/myprofile";

const MyAccount = () => {
  const userLoading = useCheckLogedinUser();

  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore?.user;
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [updateCoverPic, setUpdateCoverPic] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<CropperImageInterface | null>(
    null
  );
  const token = useCheckLogedinUserToken();
  const coverFileInputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const onCloseHandler = () => {
    setUpdateCoverPic(false);
    setCoverImage(null);
  };
  const croppedImageReady = async (file: File): Promise<void> => {
    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      console.log("Hello there", file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result) {
          // check if result is not null
          setCoverImage({
            file: file,
            fileName: file.name,
            fileUrl: result as string, // cast result as string
            fileUri: result as string, // cast result as string
            fileType: file.type,
            fileSize: file.size,
          });
        }
      };
      reader.readAsDataURL(file);
      const newCoverPic = await addCoverPic(token, formData);
      dispatch(updateCoverPhotoe(newCoverPic));
    }
  };
  const handleSelectCoverPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result) {
          // check if result is not null
          setCoverImage({
            file: file,
            fileName: file.name,
            fileUrl: result as string, // cast result as string
            fileUri: result as string, // cast result as string
            fileType: file.type,
            fileSize: file.size,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChoseCover = () => {
    coverFileInputRef.current?.click();
    setUpdateCoverPic(true);
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
          {user ? (
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
                    {updateCoverPic && coverImage ? (
                      <CropeImageDialog
                        image={coverImage}
                        croppedImageReady={croppedImageReady}
                        onCloseHandler={onCloseHandler}
                        rounded={false}
                        caption="Update Cover Photoe"
                        aspect={16 / 9}
                      />
                    ) : null}
                    <Box
                      sx={{
                        position: "relative",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Image
                        src={user && user.coverPic ? user.coverPic.fileUrl : ""}
                        alt="Cover photo"
                        width={1000}
                        height={400}
                        objectFit="cover"
                        style={{
                          width: "95%",
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
                          zIndex: 1,
                        }}
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={handleChoseCover}
                      >
                        {" "}
                        <input
                          type="file"
                          hidden
                          ref={coverFileInputRef}
                          accept="image/*"
                          onChange={handleSelectCoverPic}
                        />
                        <CameraAltRoundedIcon fontSize="small" />
                        Edit cover photo
                      </Button>
                    </Box>

                    {/* User card */}
                    <Box
                      sx={{
                        ml: 7,
                        mt: -3,
                      }}
                    >
                      <UserCard />
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
        <Files />
      </TabPanel>
    </SwipeableViews>
  );
};
