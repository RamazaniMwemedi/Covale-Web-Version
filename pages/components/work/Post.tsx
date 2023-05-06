import { Box, Stack } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  LinearProgress,
} from "@mui/material";
import React, { FC, useRef, useState } from "react";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ReactHtmlParser from "react-html-parser";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloseIcon from "@mui/icons-material/Close";

import dynamic from "next/dynamic";
const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

import { PostInterface } from "../../../interfaces/work";
import { timeAgo } from "../../../tools/tools";
import FileComponent from "../mediaFiles/FileComponent";
import { useTheme } from "@mui/styles";
import { ThemeInterface, UserInterFace } from "../../../interfaces/myprofile";
import { ImageIcon, RepostIcon } from "../../../assets/Icons";
import { CropperImageInterface } from "../../../interfaces/myprofile";
import { IEmojiData } from "emoji-picker-react";
import { useCheckLogedinUserToken } from "../../../hooks/hooks";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { postNewCommentToPost } from "../../../services/work";

const Post = ({ post, user }: { post: PostInterface; user: UserInterFace }) => {
  const {
    author,
    comments,
    commentsEnabled,
    files,
    createdAt,
    links,
    pinned,
    postAudience,
    priority,
    reactions,
    reactionsEnabled,
    readBy,
    shares,
    sharesDisabled,
    tags,
    text,
    updatedAt,
    id,
  } = post;
  const theme: ThemeInterface = useTheme();
  const token = useCheckLogedinUserToken();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showEmojiPeaker, setShowEmojiPeaker] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [allFiles, setAllFiles] = useState<CropperImageInterface[]>([]);
  const commentOnEmojiClick = (
    event: React.MouseEvent,
    emojiObject: IEmojiData
  ) => {
    setCommentText(commentText + emojiObject.emoji);
  };
  const fileRef = useRef<HTMLInputElement>(null);
  const handleChoseFile = () => {
    fileRef.current?.click();
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
  const removeFile = (fileName: string) => {
    setAllFiles((prevFiles) =>
      prevFiles.filter((file) => file?.fileName !== fileName)
    );
  };
  const commentTeaxtChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCommentText(e.target.value);
  };

  const postComment = async () => {
    const formData = new FormData();

    for (const file of allFiles) {
      if (file.file) {
        formData.append("files", file.file);
      }
    }

    formData.append("commentText", commentText);
    if (token) {
      setIsCommenting(true);
      const response = await postNewCommentToPost(token, formData, id);
      setTimeout(() => {
        setIsCommenting(false);
        setAllFiles([]);
        setCommentText("");
      }, 3000);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: theme.colors.background1,
        mt: 2,
        p: 1,
        borderRadius: 2,
      }}
    >
      {/* Author Details */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Author names */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          {" "}
          <Avatar
            sx={{
              height: 50,
              width: 50,
            }}
            src={author.profilePic ? author.profilePic.fileUrl : ""}
          >
            {author.firstname[0]} {author.lastname[0]}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>
              {author.firstname} {author.lastname}
            </Typography>
            <Typography variant="caption">
              @{author.username}
              {"  "}
            </Typography>
            <Typography variant="caption">{timeAgo(createdAt)}</Typography>
          </Box>
        </Box>

        {/* Right */}
        <Box
          sx={{
            display: "flex",
          }}
        >
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
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleClose}>Report</MenuItem>
          </Menu>
        </Box>
      </Box>
      {/* Post texts */}
      <Box>
        <Typography variant="body2" sx={{ color: "#333333", pt: 1 }}>
          {text.split("\n").map((item, key) => {
            // match URLs and hashtags using regular expressions
            const urls = item.match(/https?:\/\/[^\s]+/g);
            const hashtags = item.match(/#\w+/g);

            // replace URLs and hashtags with links and colored text
            if (urls && urls.length > 0) {
              urls.forEach((url) => {
                item = item.replace(
                  url,
                  `<a style="color:#1565c0;padding:0px" target=_blank href=${url}>${url}</a>`
                );
              });
            }
            if (hashtags && hashtags.length > 0) {
              hashtags.forEach((hashtag) => {
                item = item.replace(
                  hashtag,
                  `<span style="color: #1565c0; font-weight: bold;">${hashtag}</span>`
                );
              });
            }

            return (
              <span key={key}>
                {ReactHtmlParser(item)}
                <br />
              </span>
            );
          })}
        </Typography>
      </Box>
      {/* End Post texts */}
      {/* Post Files */}
      <Box>
        <FileSlider files={files} />
      </Box>
      {/* End Post Files */}
      <Divider />

      {/* Post Reactions  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Button
          color="secondary"
          variant="text"
          sx={{
            textTransform: "none",
            gap: 1,
            p: 1,
          }}
        >
          <ThumbUpAltRoundedIcon />
          Like
        </Button>
        <Button
          color="secondary"
          variant="text"
          sx={{
            textTransform: "none",
            gap: 1,
            p: 1,
          }}
        >
          <CommentRoundedIcon />
          Comments
        </Button>
        <Button
          color="secondary"
          variant="text"
          sx={{
            textTransform: "none",
            gap: 1,
            p: 1,
          }}
        >
          <RepostIcon /> Repost
        </Button>
        <Button
          color="secondary"
          variant="text"
          sx={{
            textTransform: "none",
            gap: 1,
            p: 1,
          }}
        >
          <SendRoundedIcon />
          Share
        </Button>
      </Box>
      {/* End Post Reactions  */}
      {/* Comments Section */}
      <Box
        sx={{ display: "flex", alignItems: "flex-start", position: "relative" }}
      >
        <Avatar src={user.profilePic ? user.profilePic.fileUrl : ""}>
          {user.firstname[0]} {user.lastname[0]}
        </Avatar>
        {showEmojiPeaker === true && (
          <Box
            sx={{
              position: "absolute",
              right: 0,
              bottom: 50,
              // bottom: "53px",
              // // marginLeft: "10px",
              backgroundColor: theme.colors.textBackground,
              borderRadius: "15px",

              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <IconButton
              sx={{
                marginLeft: "250px",
              }}
              onClick={() => {
                setShowEmojiPeaker((prev) => !prev);
              }}
            >
              <CloseRoundedIcon color="secondary" fontSize="small" />
            </IconButton>
            <Picker
              native={true}
              preload={true}
              searchPlaceholder={"Search emojie"}
              onEmojiClick={commentOnEmojiClick}
              pickerStyle={{
                backgroundColor: theme.colors.textBackground,
                boxShadow: "none",
                border: `1px solid ${theme.colors.textBackground}`,
              }}
            />
          </Box>
        )}
        <FormControl
          sx={{
            m: 1,
            bgcolor: theme.colors.textBackground,
            borderRadius: 2,
            width: "100%", // Remove border
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
          variant="outlined"
        >
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            multiline
            maxRows={3}
            size="small"
            color="secondary"
            fullWidth
            value={commentText}
            onChange={commentTeaxtChangeHandler}
            placeholder="Write your comment."
            endAdornment={
              <InputAdornment
                position="end"
                sx={{
                  gap: 1.5,
                }}
              >
                <IconButton
                  edge="end"
                  onClick={() => {
                    setShowEmojiPeaker(true);
                  }}
                >
                  <EmojiEmotionsRoundedIcon color="secondary" />
                </IconButton>

                <IconButton edge="end" onClick={handleChoseFile}>
                  <input
                    type="file"
                    hidden
                    ref={fileRef}
                    accept="image/*"
                    onChange={handleSelectFile}
                  />
                  <ImageIcon width={24} height={24} />
                </IconButton>
              </InputAdornment>
            }
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
              justifyContent: "flex-start",
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
                      width={displayFileBool ? 150 : 100}
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
          {!(commentText.trim().length === 0 && allFiles.length === 0) && (
            <>
              {isCommenting ? (
                <LoadingButton
                  loading={isCommenting}
                  endIcon={" "}
                  loadingPosition="end"
                  variant="contained"
                  sx={{
                    width: 30,
                    height: 23,
                    borderRadius: 2,
                    m: 1,
                    textTransform: "none",
                  }}
                />
              ) : (
                <Button
                  sx={{
                    width: 10,
                    height: 23,
                    borderRadius: 2,
                    m: 1,
                    textTransform: "none",
                  }}
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={postComment}
                >
                  Comment
                </Button>
              )}
            </>
          )}
          <Stack sx={{ width: "100%", color: "grey.500", p: 1 }} spacing={2}>
            {isCommenting ? (
              <LinearProgress
                color="secondary"
                sx={{
                  borderRadius: "10px",
                }}
              />
            ) : null}
          </Stack>
        </FormControl>
      </Box>
      {/* End Comments Section */}
    </Box>
  );
};

export default Post;

const FileSlider = ({ files }: { files: CropperImageInterface[] }) => {
  const [filePosition, setFilePosition] = useState(0);
  const nextFile = () => {
    if (filePosition < files.length - 1) {
      setFilePosition(filePosition + 1);
    }
  };

  const prevFile = () => {
    if (filePosition > 0) {
      setFilePosition(filePosition - 1);
    }
  };

  return (
    <Box
      sx={{
        mb: 1,
      }}
    >
      {files.length > 0 && (
        <Box
          sx={{
            display: "flex",
            position: "relative",
          }}
        >
          {files.length > 1 && (
            <IconButton
              sx={{ position: "absolute", top: "50%", left: 0, zIndex: 1 }}
              onClick={prevFile}
            >
              &#10094;
            </IconButton>
          )}

          <FileComponent
            height={500}
            displayFile
            width={400}
            key={files[filePosition].fileUrl}
            file={files[filePosition]}
          />
          {files.length > 1 && (
            <IconButton
              sx={{ position: "absolute", top: "50%", right: 0, zIndex: 1 }}
              onClick={nextFile}
            >
              &#10095;
            </IconButton>
          )}
        </Box>
      )}
      {/* Dots to indicate the curent file */}
      {files.length > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {files.map((_, index) => (
            <Box
              key={index}
              sx={{
                height: 8,
                width: 8,
                borderRadius: "50%",
                mx: 1,
                bgcolor: filePosition === index ? "secondary.main" : "grey.500",
                cursor: "pointer",
              }}
              onClick={() => setFilePosition(index)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
