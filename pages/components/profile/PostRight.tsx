import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import React, { FC, RefObject, useRef, useState } from "react";
import { RootState, ThemeInterface } from "../../../interfaces/myprofile";
import { useDispatch, useSelector } from "react-redux";

import {
  EventIcon,
  FileIcon,
  ImageIcon,
  PrizeIcon,
  VideoIcon,
} from "../../../assets/Icons";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import PollRoundedIcon from "@mui/icons-material/PollRounded";
import Groups3RoundedIcon from "@mui/icons-material/Groups3Rounded";
import PublicIcon from "@mui/icons-material/Public";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import { CropperImageInterface } from "../../../interfaces/myprofile";
import { CropeImageDialog } from "./UserCard";
import FileComponent from "../mediaFiles/FileComponent";
import { createNewPostService } from "../../../services/work";
import { useCheckLogedinUserToken } from "../../../hooks/hooks";
import { addPost } from "../../../Redux/slices/work";
import Post from "../work/Post";
import { useGetUserPosts } from "../../../hooks/work";

const PostRight = () => {
  const userStore = useSelector((state: RootState) => state.user);
  const mapStateToProps = (state: RootState) => {
    const sortedState = state.work?.work.posts
      .slice()
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return sortedState;
  };
  const posts = useSelector((state: RootState) => mapStateToProps(state));
  const user = userStore?.user;
  // const { posts } = workStore.;

  const loading = useGetUserPosts(user ? user.id : "");

  return (
    <>
      {user && (
        <>
          {/* Top component */}

          <AddANewPost />
          {loading ? (
            <Box
              display={"grid"}
              sx={{
                placeItems: "center",
                heigh: "100%",
              }}
            >
              <CircularProgress size={30} />
            </Box>
          ) : (
            <>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Post post={post} user={user} key={post.id} />
                ))
              ) : (
                <Box
                  display={"grid"}
                  sx={{
                    placeItems: "center",
                    heigh: "100%",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: (theme) => theme.palette.action.hover,
                      borderRadius: 4,
                      mt: 3,
                      p: 4,
                    }}
                  >
                    <Typography variant="h5">
                      You haven't posted anything yet
                    </Typography>
                    <Typography variant="body2" textAlign={"center"}>
                      Click on "Publish an Update" to post
                    </Typography>
                  </Box>
                </Box>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export const FilterPosts = () => {
  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          color="inherit"
          sx={{
            bgcolor: (theme) => theme.palette.action.focus,
          }}
        >
          Explore
        </Button>
        <Button
          variant="contained"
          color="inherit"
          sx={{
            bgcolor: (theme) => theme.palette.action.focus,
          }}
        >
          Explore
        </Button>
        <Button
          variant="contained"
          color="inherit"
          sx={{
            bgcolor: (theme) => theme.palette.action.focus,
          }}
        >
          Explore
        </Button>
        <Button
          variant="contained"
          color="inherit"
          sx={{
            bgcolor: (theme) => theme.palette.action.focus,
          }}
        >
          Explore
        </Button>
      </Box>
    </>
  );
};

export const AddANewPost = () => {
  const theme: ThemeInterface = useTheme();
  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore?.user;
  const token = useCheckLogedinUserToken();
  const dispatch = useDispatch();
  // States
  const [open, setOpen] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postAudience, setPostAudience] = useState<string>("Anyone");
  const [postContentText, setPostContentText] = useState<string>("");
  const [checkedEnableReactions, setCheckedEnableReactions] = useState(true);
  const [checkedEnableComments, setCheckedEnableComments] = useState(true);

  const [selectPhoto, setSelectPhoto] = useState(false);

  // References
  const photoReference = useRef<HTMLInputElement>(null);
  const videoReference = useRef<HTMLInputElement>(null);
  const fileReference = useRef<HTMLInputElement>(null);

  // Files
  const [photo, setPhoto] = useState<CropperImageInterface | null>(null);

  //    All files
  const [allFiles, setAllFiles] = useState<CropperImageInterface[]>([]);

  // Handles
  const toggleOpenCreatePostForm = () => {
    setOpen((prev) => !prev);
    setPostAudience("Anyone");
    setPostContentText("");
    setSelectPhoto(false);
    setPosting(false);
    setPhoto(null);
    setAllFiles([]);
  };

  const handleChangeEnableReactions = () => {
    setCheckedEnableReactions((prev) => !prev);
  };
  const handleChangeEnableComments = () => {
    setCheckedEnableComments((prev) => !prev);
  };
  const onSelectPostAudienceChange = (value: string) => {
    setPostAudience(value);
  };

  const onPostContentTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostContentText(e.target.value);
  };

  const handleChosePhoto = () => {
    photoReference.current?.click();
    setSelectPhoto(true);
  };
  const handleChoseVideo = () => {
    videoReference.current?.click();
  };
  const handleChoseFile = () => {
    fileReference.current?.click();
  };
  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("File :>>", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result) {
          setPhoto({
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
  const handleSelectVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        // Check file size
        if (file.size > 512 * 1024 * 1024) {
          alert("File size exceeds 512MB limit");
          return;
        } else {
          setAllFiles((prev) => [
            ...prev,
            {
              file: file,
              fileName: file.name,
              fileUrl: result as string, // cast result as string
              fileUri: result as string, // cast result as string
              fileType: file.type,
              fileSize: file.size,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        // Check file size
        if (file.size > 512 * 1024 * 1024) {
          alert("File size exceeds 512MB limit");
          return;
        } else {
          setAllFiles((prev) => [
            ...prev,
            {
              file: file,
              fileName: file.name,
              fileUrl: result as string, // cast result as string
              fileUri: result as string, // cast result as string
              fileType: file.type,
              fileSize: file.size,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const croppedImageReady = async (file: File): Promise<void> => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result) {
          // check if result is not null
          setAllFiles((prev) => [
            ...prev,
            {
              file: file,
              fileName: file.name,
              fileUrl: result as string, // cast result as string
              fileUri: result as string, // cast result as string
              fileType: file.type,
              fileSize: file.size,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (fileName: string) => {
    setAllFiles((prevFiles) =>
      prevFiles.filter((file) => file?.fileName !== fileName)
    );
  };

  const onCloseHandler = () => {
    setSelectPhoto(false);
    setPhoto(null);
  };

  const handleSubmitPost = async () => {
    const formData = new FormData();

    for (const file of allFiles) {
      if (file.file) {
        formData.append("files", file.file);
      }
    }

    formData.append("text", postContentText);
    formData.append("postAudience", postAudience);

    formData.append("reactionsEnabled", checkedEnableReactions.toString());
    formData.append("commentsEnabled", checkedEnableComments.toString());
    if (token) {
      setPosting(true);
      const response = await createNewPostService(token, formData);
      if (response) {
        toggleOpenCreatePostForm();
        dispatch(addPost(response));
      }
    }
  };

  return (
    <>
      {user && (
        <Box>
          {/* The Box */}
          <Box
            sx={{
              bgcolor: theme.colors.background1,
              p: 1,
              pl: 2,
              pr: 2,
              borderRadius: 2,
            }}
          >
            {/* Top */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              {user.profilePic ? (
                <Avatar src={user.profilePic.fileUrl}>
                  {user && user.username[0]}
                </Avatar>
              ) : (
                <Avatar>
                  {user && user.username[0]}
                  {user && user.lastname[0]}
                </Avatar>
              )}

              <Button
                sx={{
                  alignItems: "center",
                  display: "flex",
                  gap: 1,
                  bgcolor: theme.colors.textBackground,
                  p: 1,
                  borderRadius: 3,
                  textTransform: "none",
                  cursor: "pointer",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
                color="secondary"
                onClick={toggleOpenCreatePostForm}
                variant="outlined"
              >
                Publish an Update
              </Button>
            </Box>
            <Divider />
            {/* Botom */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pt: 1,
              }}
            >
              <Button
                sx={{
                  alignItems: "center",
                  display: "flex",
                  gap: 1,
                  bgcolor: theme.colors.textBackground,
                  p: 1,
                  borderRadius: 3,
                  textTransform: "none",
                  cursor: "pointer",
                }}
                color="secondary"
                onClick={toggleOpenCreatePostForm}
              >
                <ImageIcon height={24} width={24} />
                Photos / Video
              </Button>
              <Button
                sx={{
                  alignItems: "center",
                  display: "flex",
                  gap: 1,
                  bgcolor: theme.colors.textBackground,
                  p: 1,
                  borderRadius: 3,
                  textTransform: "none",
                  cursor: "pointer",
                }}
                color="secondary"
              >
                <FileIcon height={24} width={24} />
                Files
              </Button>
              <Button
                sx={{
                  alignItems: "center",
                  display: "flex",
                  gap: 1,
                  bgcolor: theme.colors.textBackground,
                  p: 1,
                  borderRadius: 3,
                  textTransform: "none",
                  cursor: "pointer",
                }}
                color="secondary"
              >
                <EventIcon height={24} width={24} />
                Event
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      {open && (
        <>
          <CreateNewPostForm
            open={open}
            posting={posting}
            toggleOpenCreatePostForm={toggleOpenCreatePostForm}
            postAudience={postAudience}
            postContentText={postContentText}
            handleChosePhoto={handleChosePhoto}
            handleChoseVideo={handleChoseVideo}
            photoReference={photoReference}
            handleSelectPhoto={handleSelectPhoto}
            videoReference={videoReference}
            allFiles={allFiles}
            removeFile={removeFile}
            onSelectPostAudienceChange={onSelectPostAudienceChange}
            onPostContentTextChange={onPostContentTextChange}
            handleSubmitPost={handleSubmitPost}
            handleSelectVideo={handleSelectVideo}
            handleChoseFile={handleChoseFile}
            fileReference={fileReference}
            handleSelectFile={handleSelectFile}
            checkedEnableReactions={checkedEnableReactions}
            handleChangeEnableReactions={handleChangeEnableReactions}
            checkedEnableComments={checkedEnableComments}
            handleChangeEnableComments={handleChangeEnableComments}
          />
          {selectPhoto && photo ? (
            <CropeImageDialog
              image={photo}
              croppedImageReady={croppedImageReady}
              onCloseHandler={onCloseHandler}
              rounded={false}
              caption="Update Cover Photo"
              aspect={20 / 15}
            />
          ) : null}
        </>
      )}
    </>
  );
};

interface CreateNewPostFormProp {
  checkedEnableReactions: boolean;
  handleChangeEnableReactions: () => void;
  checkedEnableComments: boolean;
  handleChangeEnableComments: () => void;
  open: boolean;
  posting: boolean;
  postAudience: string;
  postContentText: string;
  toggleOpenCreatePostForm: () => void;
  handleChosePhoto: () => void;
  handleChoseFile: () => void;
  handleChoseVideo: () => void;
  handleSubmitPost: () => void;
  photoReference: RefObject<HTMLInputElement>;
  videoReference: RefObject<HTMLInputElement>;
  fileReference: RefObject<HTMLInputElement>;
  handleSelectPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectVideo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allFiles: CropperImageInterface[];
  removeFile: (fileName: string) => void;
  onSelectPostAudienceChange: (value: string) => void;
  onPostContentTextChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const CreateNewPostForm: FC<CreateNewPostFormProp> = ({
  open,
  toggleOpenCreatePostForm,
  posting,
  postContentText,
  postAudience,
  handleChosePhoto,
  handleChoseVideo,
  photoReference,
  handleSelectPhoto,
  videoReference,
  fileReference,
  allFiles,
  removeFile,
  onSelectPostAudienceChange,
  onPostContentTextChange,
  handleSubmitPost,
  handleSelectVideo,
  handleChoseFile,
  handleSelectFile,
  checkedEnableReactions,
  handleChangeEnableReactions,
  checkedEnableComments,
  handleChangeEnableComments,
}) => {
  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore?.user;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElReactionAndComment, setAnchorElReactionAndComment] =
    useState<null | HTMLElement>(null);
  const openSelect = Boolean(anchorEl);
  const openSelectReactionAndCommemt = Boolean(anchorElReactionAndComment);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickReactionAndComment = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorElReactionAndComment(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseReactionAndComment = () => {
    setAnchorElReactionAndComment(null);
  };
  const theme: ThemeInterface = useTheme();

  const postAudienceIcon = (postAudience: string) => {
    if (postAudience.toLowerCase() === "anyone") {
      return <PublicIcon />;
    } else if (postAudience.toLowerCase() === "my connection only") {
      return <Groups3RoundedIcon />;
    } else if (postAudience.toLowerCase() === "only me") {
      return <LockRoundedIcon />;
    }
    return <PublicIcon />;
  };

  return (
    <>
      {user && (
        <Dialog open={open} fullWidth maxWidth="sm">
          <DialogTitle>
            Create a Post{" "}
            <IconButton
              aria-label="close"
              onClick={toggleOpenCreatePostForm}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            {/* User Box */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {user.profilePic ? (
                <Avatar
                  sx={{
                    height: 50,
                    width: 50,
                  }}
                  src={user.profilePic.fileUrl}
                >
                  {user && user.username[0]}
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                >
                  {user && user.username[0]}
                  {user && user.lastname[0]}
                </Avatar>
              )}{" "}
              <Box>
                <Typography variant="subtitle1">
                  {`${user.username} ${user.lastname}`}
                </Typography>
                <div>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Button
                      aria-label="more"
                      id="long-button"
                      aria-controls={openSelect ? "long-menu" : undefined}
                      aria-expanded={openSelect ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        gap: 1,
                        bgcolor: theme.colors.textBackground,
                        p: 1,
                        borderRadius: 2,
                        textTransform: "none",
                        cursor: "pointer",
                        justifyContent: "flex-start",
                      }}
                      color="secondary"
                      variant="outlined"
                      size="small"
                    >
                      {postAudienceIcon(postAudience)} {postAudience}{" "}
                      <ArrowDropDownRoundedIcon />
                    </Button>
                    <Button
                      aria-label="more"
                      id="long-button"
                      aria-controls={openSelect ? "long-menu" : undefined}
                      aria-expanded={openSelect ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClickReactionAndComment}
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        gap: 1,
                        bgcolor: theme.colors.textBackground,
                        p: 1,
                        borderRadius: 2,
                        textTransform: "none",
                        cursor: "pointer",
                        justifyContent: "flex-start",
                      }}
                      color="secondary"
                      variant="outlined"
                      size="small"
                    >
                      Comment and Reaction Settings
                    </Button>
                  </Box>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={openSelect}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: "40ch",
                      },
                    }}
                  >
                    <FormControl
                      sx={{
                        pl: 2,
                      }}
                      color="secondary"
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        Who can see your post?
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={postAudience}
                        name="radio-buttons-group"
                        onChange={(_, value) => {
                          onSelectPostAudienceChange(value);
                          handleClose();
                        }}
                      >
                        <FormControlLabel
                          value="Anyone"
                          control={<Radio size="small" color="secondary" />}
                          label={
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                              variant="caption"
                            >
                              <PublicIcon fontSize="small" />
                              Anyone
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="My Connection only"
                          control={<Radio size="small" color="secondary" />}
                          label={
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                              variant="caption"
                            >
                              <Groups3RoundedIcon fontSize="small" />
                              My Connection only
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="Only me"
                          control={<Radio size="small" color="secondary" />}
                          label={
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                              variant="caption"
                            >
                              <LockRoundedIcon fontSize="small" />
                              Only me
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Menu>
                  {/* Reaction and Comment Menu */}
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorElReactionAndComment}
                    open={openSelectReactionAndCommemt}
                    onClose={handleCloseReactionAndComment}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: "40ch",
                      },
                    }}
                  >
                    <FormControl
                      sx={{
                        pl: 2,
                      }}
                      color="secondary"
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        Enable or Disable commenting and reactions on your post
                      </FormLabel>
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            checked={checkedEnableReactions}
                            onChange={handleChangeEnableReactions}
                            defaultChecked
                          />
                        }
                        label="Enable Reactions "
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            checked={checkedEnableComments}
                            onChange={handleChangeEnableComments}
                            defaultChecked
                          />
                        }
                        label="Enable Comments "
                      />
                    </FormControl>
                  </Menu>
                </div>
              </Box>
            </Box>
            {/* Post Content */}
            <TextField
              fullWidth
              id="fullWidth"
              color="secondary"
              multiline
              maxRows={6}
              value={postContentText}
              sx={{
                // Remove border
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
              onChange={onPostContentTextChange}
              placeholder="What do you want to talk about today?"
            />

            {/* Files */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "10px",
                p: 1,
                ml: 1,
                maxHeight: "300px",
                overflow: "scroll",
                overflowX: "unset",
              }}
            >
              {allFiles.length > 0 &&
                allFiles.map((file) => {
                  const displayFile = (myFile: CropperImageInterface) => {
                    if (
                      myFile.fileType.includes("image") ||
                      myFile.fileType.includes("video")
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  };
                  const displayFileBool = displayFile(file);

                  return (
                    <Box position="relative">
                      <FileComponent
                        file={file}
                        width={displayFileBool ? 200 : 100}
                        height={150}
                        displayFile={displayFileBool}
                      />
                      <IconButton
                        aria-label="close"
                        onClick={() => removeFile(file.fileName)}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 5,
                          color: (theme) => theme.palette.grey[500],
                        }}
                        size="small"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  );
                })}
            </Box>
            {/* Add to your Post */}
            <Box
              sx={{
                boxShadow: 3,
                display: "flex",
                alignItems: "center",
                p: 1,
                justifyContent: "space-between",
                borderRadius: 2,
                mt: 0.8,
              }}
            >
              <Typography variant="subtitle2">Add to your post</Typography>
              <Box>
                <Tooltip title="Photo" placement="top-start">
                  <IconButton onClick={handleChosePhoto}>
                    <ImageIcon height={24} width={24} />

                    <input
                      type="file"
                      hidden
                      ref={photoReference}
                      accept="image/*"
                      onChange={handleSelectPhoto}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Video" placement="top-start">
                  <IconButton onClick={handleChoseVideo}>
                    <VideoIcon height={24} width={24} />
                    <input
                      type="file"
                      hidden
                      ref={videoReference}
                      accept="video/*"
                      onChange={handleSelectVideo}
                    />
                  </IconButton>
                </Tooltip>{" "}
                <Tooltip title="File" placement="top-start">
                  <IconButton onClick={handleChoseFile}>
                    <FileIcon height={24} width={24} />
                    <input
                      type="file"
                      hidden
                      ref={fileReference}
                      accept=".doc,
                      .docx,
                      'application/msword',
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                      'application/vnd.ms-excel',
                      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                      'application/vnd.ms-powerpoint',
                      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                      'application/pdf',
                      'application/vnd.google-apps.document',
                      'application/vnd.google-apps.spreadsheet',
                      'application/vnd.google-apps.presentation',
                      'application/wps-office.doc',
                      'application/wps-office.xls',
                      'application/wps-office.ppt',
                      .pptx,
                      .xlsx,
                      .pdf"
                      onChange={handleSelectFile}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Event" placement="top-start">
                  <IconButton>
                    <EventIcon height={24} width={24} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Event" placement="top-start">
                  <IconButton>
                    <PollRoundedIcon color="secondary" fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Celebrate" placement="top-start">
                  <IconButton>
                    <PrizeIcon height={24} width={24} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            {posting ? (
              <LoadingButton
                loading
                endIcon={<SendIcon />}
                loadingPosition="end"
                variant="contained"
              />
            ) : (
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  textTransform: "none",
                }}
                size="small"
                onClick={handleSubmitPost}
              >
                Post
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default PostRight;
