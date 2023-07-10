import React, { FC, useState } from "react";
import DrawerComponent from "../components/others/DrawerComponent";
import { useDispatch, useSelector } from "react-redux";
import LoadingLogo from "../components/others/LoadingLogo";
import { useTheme } from "@mui/styles";
import {
  Button,
  CssBaseline,
  Tabs,
  Tab,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  Box,
  Link,
} from "@mui/material";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
import defaultBackgroundImage from "../../assets/defaultBackgroundImage.jpeg";
import {
  ContentsProps,
  CropperImageInterface,
  FullWidthTabsProps,
  RootState,
  TabPanelProps,
} from "../../interfaces/myprofile";
import {
  PersonalInfoIcon,
  PrivacyIcon,
  UserShieldIcon,
} from "../../assets/Icons";
import moment from "moment";

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
  const handleChange = (newValue: number) => {
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
                  display: "grid",
                  // placeItems: "center",
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
                        src={
                          user && user.coverPic
                            ? user.coverPic.fileUrl
                            : defaultBackgroundImage
                        }
                        alt="Cover photo"
                        width={2000}
                        height={600}
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
                <Box
                  sx={{
                    p: 5,
                  }}
                >
                  <Contents
                    value={value}
                    handleChangeIndex={handleChangeIndex}
                  />
                </Box>
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
        onChange={(_, value) => handleChange(value)}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        aria-label="Contents Tab"
      >
        <Tab sx={{ textTransform: "unset" }} label="Posts" {...a11yProps(0)} />
        <Tab sx={{ textTransform: "unset" }} label="Teams" {...a11yProps(1)} />
      </Tabs>
      <LongMenu handleChange={handleChange} />{" "}
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
        <TeamsSection />
      </TabPanel>

      <TabPanel value={value} index={2} dir={theme.direction}>
        Personal Info
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        Data & Privacy
      </TabPanel>
      <TabPanel value={value} index={4} dir={theme.direction}>
        Security
      </TabPanel>
    </SwipeableViews>
  );
};

const TeamsSection: FC = () => {
  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore?.user;
  const teams = user && user.teams;
  return (
    <>
      <Box>
        <Typography variant="h4">Teams</Typography>
        {teams && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "10px",
              p: 1,
              ml: 1,
            }}
          >
            {teams.map((team) => {
              return (
                <Box
                  key={team.id}
                  sx={{
                    display: "flex",
                    bgcolor: (theme) => theme.palette.action.focus,
                    p: 2,
                    borderRadius: 3,
                    gap: 2,
                  }}
                >
                  <Avatar>{team.teamName[0]}</Avatar>
                  <Box display={"flex"} flexDirection={"column"}>
                    <Link
                      href={`/chats/t/${team.id}`}
                      underline="none"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        display: "flex",
                        p: 0,
                      }}
                    >
                      <Typography variant="h6">{team.teamName}</Typography>
                    </Link>
                    <Typography variant="caption" color="text.secondary">
                      Created{" "}
                      {moment(team.createdAt).format("HH:MM DD MMMM YYYY")}
                    </Typography>
                    <br />
                    <Typography variant="body2">
                      Memebers: {team.members.length}
                    </Typography>
                    <Typography variant="body2">
                      Projects: {team.projects.length}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </>
  );
};

function LongMenu({
  handleChange,
}: {
  handleChange: (newValue: number) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "25ch",
          },
        }}
      >
        <MenuItem
          sx={{
            display: "flex",
            gap: 1,
          }}
          onClick={() => handleChange(2)}
        >
          <PersonalInfoIcon height={24} width={24} />
          <Typography>Personal Info</Typography>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            gap: 1,
          }}
          onClick={() => handleChange(3)}
        >
          <PrivacyIcon height={24} width={24} />
          <Typography>Data & Privacy</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleChange(4)}
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <UserShieldIcon height={24} width={24} />
          <Typography>Security</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
