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
  Tooltip,
} from "@mui/material";
import React, { useRef, useState } from "react";
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

import { CommentInterface, PostInterface } from "../../../interfaces/work";
import { timeAgo } from "../../../tools/tools";
import FileComponent from "../mediaFiles/FileComponent";
import { useTheme } from "@mui/styles";
import { ThemeInterface, UserInterFace } from "../../../interfaces/myprofile";
import {
  BulbIcon,
  CelebrateIcon,
  FunnyIcon,
  HandHoldingHeartIcon,
  HeartIcon,
  ImageIcon,
  RepostIcon,
  ThinkinhFaceIcon,
  ThumbsUpIcon,
} from "../../../assets/Icons";
import { CropperImageInterface } from "../../../interfaces/myprofile";
import { IEmojiData } from "emoji-picker-react";
import { useCheckLogedinUserToken } from "../../../hooks/hooks";
import { LoadingButton } from "@mui/lab";
import {
  postNewCommentToPost,
  postNewReplyToComment,
  reactOnApost,
  reactOnApostComment,
} from "../../../services/work";
import { useDispatch } from "react-redux";
import {
  addCommentToPost,
  addReplyToComment,
  reactOnPostCommentState,
  reactOnPostState,
} from "../../../Redux/slices/work";

const Post = ({ post, user }: { post: PostInterface; user: UserInterFace }) => {
  const author: UserInterFace | null = post ? post.author : null;
  const comments: CommentInterface[] | null = post ? post.comments : null;
  const files: CropperImageInterface[] | null = post ? post.files : null;
  const createdAt: string | null = post ? post.createdAt : null;
  const text: string | null = post ? post.text : null;
  const id: string | null = post ? post.id : null;
  const reactions:
    | {
        user: UserInterFace;
        type: string;
        id?: string | undefined;
      }[]
    | null = post ? post.reactions : null;
  const theme: ThemeInterface = useTheme();
  const token = useCheckLogedinUserToken();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
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
    _: React.MouseEvent,
    emojiObject: IEmojiData
  ) => {
    setCommentText(commentText + emojiObject.emoji);
    setShowEmojiPeaker((prev) => !prev);
  };
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
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

  const reactionHandle = async (
    reaction:
      | "like"
      | "love"
      | "celebrate"
      | "insightful"
      | "curious"
      | "support"
      | "funny"
  ) => {
    if (token && id) {
      setShowReactions(false);

      const statusCode = await reactOnApost(token, id, reaction);
      if (author) {
        dispatch(
          reactOnPostState({
            postId: id,
            newReaction: reaction,
            statusCode,
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: author.lastname,
              profilePic: user.profilePic,
            },
          })
        );
      }
    }
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

    if (token && id) {
      setIsCommenting(true);
      const response = await postNewCommentToPost(token, formData, id);
      if (response) {
        dispatch(
          addCommentToPost({
            postId: id,
            newComment: response,
          })
        );
        setIsCommenting(false);
        setAllFiles([]);
        setCommentText("");
      }
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
        {author && (
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
        )}

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
        <Typography variant="body2" sx={{ pt: 1 }}>
          {text &&
            text.split("\n").map((item, key) => {
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
      <Box>{files && <FileSlider files={files} />}</Box>
      {/* End Post Files */}
      {/* Post Reactions  */}
      <Box>
        {reactions &&
          reactions
            .slice(0, 3)
            .map((reaction) =>
              reactionIcon(reaction.type, { width: 20, height: 20 })
            )}
        {reactions && <>{reactions.length > 0 && reactions.length}</>}
      </Box>
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
          onMouseOver={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
          onDoubleClick={() => {
            reactionHandle("like");
            setShowReactions(false);
          }}
          sx={{
            textTransform: "none",
            gap: 1,
            p: 1,
            position: "relative",
          }}
        >
          {" "}
          {showReactions && <PostReactions reactionHandle={reactionHandle} />}
          <ThumbUpAltRoundedIcon />
          Like
        </Button>
        <Button
          color={"secondary"}
          variant={showCommentSection ? "outlined" : "text"}
          sx={{
            textTransform: "none",
            gap: 1,
            p: 1,
            borderRadius: 3,
          }}
          onClick={() => setShowCommentSection((prev) => !prev)}
        >
          <CommentRoundedIcon />
          {comments && comments.length} Comments
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
        {user && (
          <Avatar src={user.profilePic ? user.profilePic.fileUrl : ""}>
            {user.firstname[0]} {user.lastname[0]}
          </Avatar>
        )}
        {showEmojiPeaker === true && (
          <Box
            sx={{
              position: "absolute",
              right: 0,
              bottom: 100,
              zIndex: 1,
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
                    setShowEmojiPeaker((p) => !p);
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
                  <Box position="relative" key={file.id}>
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
        </FormControl>
      </Box>
      {/* End Comments Section */}
      {showCommentSection && (
        <PostComments
          postId={id ? id : ""}
          comments={comments ? comments : []}
          user={user}
        />
      )}
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
        display: "grid",
        placeItems: "center",
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
      {files.length > 0 && (
        <Box
          sx={{
            display: "flex",
          }}
        >
          <FileComponent
            height={500}
            displayFile
            width={400}
            key={files[filePosition].fileUrl}
            file={files[filePosition]}
          />
        </Box>
      )}
      {files.length > 1 && (
        <IconButton
          sx={{ position: "absolute", top: "50%", right: 0, zIndex: 1 }}
          onClick={nextFile}
        >
          &#10095;
        </IconButton>
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

const PostComments = ({
  comments,
  user,
  postId,
}: {
  comments: CommentInterface[];
  user: UserInterFace;
  postId: string;
}) => {
  const [view, setView] = useState(false);

  // sort the comments by createdAt in descending order
  const sortedComments = comments.slice().sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  return (
    <Box sx={{ maxHeight: view ? "auto" : "15rem", overflowY: "auto" }}>
      {sortedComments.map((comment) => (
        <PostComment
          user={user}
          postId={postId}
          comment={comment}
          key={comment.id}
        />
      ))}
      <Button onClick={() => setView((p) => !p)}>Load more</Button>
    </Box>
  );
};

const PostComment = ({
  comment,
  user,

  postId,
}: {
  comment: CommentInterface;
  user: UserInterFace;
  postId: string;
}) => {
  const dispatch = useDispatch();
  const token = useCheckLogedinUserToken();
  const [showReactions, setShowReactions] = useState(false);
  const { id } = comment;
  const reactionHandle = async (
    reaction:
      | "like"
      | "love"
      | "celebrate"
      | "insightful"
      | "curious"
      | "support"
      | "funny"
  ) => {
    if (token && id) {
      setShowReactions(false);

      const statusCode = await reactOnApostComment(token, id, reaction);

      dispatch(
        reactOnPostCommentState({
          commentId: id,
          postId: postId,
          newReaction: reaction,
          statusCode,
          user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            profilePic: user.profilePic,
          },
        })
      );
    }
  };

  const theme: ThemeInterface = useTheme();
  const [showEmojiPeaker, setShowEmojiPeaker] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  // Reply open state
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const [allFiles, setAllFiles] = useState<CropperImageInterface[]>([]);
  const commentOnEmojiClick = (
    _: React.MouseEvent,
    emojiObject: IEmojiData
  ) => {
    setCommentText(commentText + emojiObject.emoji);
    setShowEmojiPeaker((prev) => !prev);
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

    if (token && id) {
      setIsCommenting(true);
      const response = await postNewReplyToComment(token, formData, postId, id);
      if (response) {
        dispatch(
          addReplyToComment({
            postId: postId,
            commentId: id,
            reply: response,
          })
        );
        setIsCommenting(false);
        setAllFiles([]);
        setCommentText("");
      }
    }
  };

  return (
    <Box sx={{ p: 2, position: "relative" }}>
      <Box sx={{ display: "flex", position: "relative" }}>
        <Avatar
          sx={{
            height: 30,
            width: 30,
            mt: 0.3,
          }}
          src={comment.author.profilePic?.fileUrl}
        >
          {comment.author.firstname[0]}
          {comment.author.lastname[0]}
        </Avatar>
        <Box
          sx={{
            bgcolor: theme.colors.textBackground2,
            width: "100%",
            p: 1,
            borderRadius: 2,
            borderTopLeftRadius: 0,
          }}
        >
          <Box>
            <Typography variant={"subtitle1"} fontWeight={700}>
              {comment.author.firstname} {comment.author.lastname}
            </Typography>
            <Tooltip
              title={comment.author.professionalSummary}
              placement="right-start"
            >
              <Typography variant="caption" color="action">
                {comment.author.professionalSummary &&
                comment.author.professionalSummary.length > 80
                  ? `${comment.author.professionalSummary.substring(0, 80)}...`
                  : comment.author.professionalSummary}
              </Typography>
            </Tooltip>
          </Box>
          <Typography>{comment.commentText}</Typography>

          {/* All files grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(90px, 90px))",
              p: 1,
            }}
          >
            {" "}
            {comment.files.length > 0 &&
              comment.files.map((file) => {
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
                  <Box key={file.id}>
                    <FileComponent
                      file={file}
                      width={displayFileBool ? 90 : 90}
                      height={90}
                      displayFile={displayFileBool}
                    />
                  </Box>
                );
              })}
          </Box>

          {/*  Comment Reactions*/}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant="text"
                size="small"
                onMouseOver={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
                onDoubleClick={() => {
                  reactionHandle("like");
                  setShowReactions(false);
                }}
                sx={{
                  textTransform: "none",
                  gap: 1,
                  p: 1,
                  position: "relative",
                }}
              >
                {" "}
                {showReactions && (
                  <PostReactions reactionHandle={reactionHandle} />
                )}
                Like
              </Button>
              {comment.reactions
                .slice(0, 3)
                .map((reaction) =>
                  reactionIcon(reaction.type, { width: 20, height: 20 })
                )}
              {comment.reactions.length > 0 && comment.reactions.length}

              <Button
                variant="text"
                size="small"
                sx={{
                  textTransform: "none",
                  gap: 1,
                  p: 1,
                  position: "relative",
                }}
                onClick={() => setIsReplyOpen((p) => !p)}
              >
                Reply
              </Button>
              <Typography variant="caption">
                {comment.replies && comment.replies.length} Replie
                {comment.replies && comment.replies.length > 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Comments Section */}
      {/* CommentReply */}
      <Box
        sx={{
          alignItems: "flex-start",
          position: "relative",
          pl: 10,
        }}
      >
        {comment.replies &&
          comment.replies.length > 0 &&
          comment.replies.map((reply) => (
            <CommentReply
              comment={reply}
              user={user}
              commentId={comment.id}
              key={reply.id}
            />
          ))}
      </Box>

      {isReplyOpen && (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            position: "relative",
            pl: 6,
          }}
        >
          <Avatar
            sx={{
              width: 25,
              height: 25,
              mt: 2,
            }}
            src={user.profilePic ? user.profilePic.fileUrl : ""}
          >
            {user.firstname[0]} {user.lastname[0]}
          </Avatar>
          {showEmojiPeaker === true && (
            <Box
              sx={{
                position: "absolute",
                right: 0,
                bottom: 100,
                zIndex: 1,
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
                  zIndex: "10px",
                }}
              />
            </Box>
          )}
          <FormControl
            sx={{
              m: 1,
              bgcolor: theme.colors.textBackground,
              borderRadius: 2,
              justifyContent: "flex-end",
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
              placeholder="Add a reply."
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
                      setShowEmojiPeaker((p) => !p);
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
                    <Box position="relative" key={file.id}>
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
          </FormControl>
        </Box>
      )}
      {/* End Comments Section */}
    </Box>
  );
};
const CommentReply = ({
  comment,
  user,

  commentId,
}: {
  comment: CommentInterface;
  user: UserInterFace;
  commentId: string;
}) => {
  const dispatch = useDispatch();
  const token = useCheckLogedinUserToken();
  const [showReactions, setShowReactions] = useState(false);
  const { id } = comment;
  const reactionHandle = async (
    reaction:
      | "like"
      | "love"
      | "celebrate"
      | "insightful"
      | "curious"
      | "support"
      | "funny"
  ) => {
    if (token && id) {
      setShowReactions(false);

      const statusCode = await reactOnApostComment(token, id, reaction);

      dispatch(
        reactOnPostCommentState({
          commentId: id,
          postId: commentId,
          newReaction: reaction,
          statusCode,
          user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            profilePic: user.profilePic,
          },
        })
      );
    }
  };

  const theme: ThemeInterface = useTheme();

  return (
    <>
      {comment.author && (
        <Box sx={{ p: 2, position: "relative" }}>
          <Box sx={{ display: "flex", position: "relative" }}>
            <Avatar
              sx={{
                height: 30,
                width: 30,
                mt: 0.3,
              }}
              src={comment.author.profilePic?.fileUrl}
            >
              {comment.author.firstname[0]}
              {comment.author.lastname[0]}
            </Avatar>
            <Box
              sx={{
                bgcolor: theme.colors.textBackground2,
                width: "100%",
                p: 1,
                borderRadius: 2,
                borderTopLeftRadius: 0,
              }}
            >
              <Box>
                <Typography variant={"subtitle1"} fontWeight={700}>
                  {comment.author.firstname} {comment.author.lastname}
                </Typography>
                <Tooltip
                  title={comment.author.professionalSummary}
                  placement="right-start"
                >
                  <Typography variant="caption" color="action">
                    {comment.author.professionalSummary &&
                    comment.author.professionalSummary.length > 80
                      ? `${comment.author.professionalSummary.substring(
                          0,
                          80
                        )}...`
                      : comment.author.professionalSummary}
                  </Typography>
                </Tooltip>
              </Box>
              <Typography>{comment.commentText}</Typography>

              {/* All files grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(90px, 90px))",
                  p: 1,
                }}
              >
                {" "}
                {comment.files.length > 0 &&
                  comment.files.map((file) => {
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
                      <Box key={file.id}>
                        <FileComponent
                          file={file}
                          width={displayFileBool ? 90 : 90}
                          height={90}
                          displayFile={displayFileBool}
                        />
                      </Box>
                    );
                  })}
              </Box>

              {/*  Comment Reactions*/}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="text"
                    size="small"
                    onMouseOver={() => setShowReactions(true)}
                    onMouseLeave={() => setShowReactions(false)}
                    onDoubleClick={() => {
                      reactionHandle("like");
                      setShowReactions(false);
                    }}
                    sx={{
                      textTransform: "none",
                      gap: 1,
                      p: 1,
                      position: "relative",
                    }}
                  >
                    {" "}
                    {showReactions && (
                      <PostReactions reactionHandle={reactionHandle} />
                    )}
                    Like
                  </Button>
                  {comment.reactions
                    .slice(0, 3)
                    .map((reaction) =>
                      reactionIcon(reaction.type, { width: 20, height: 20 })
                    )}
                  {comment.reactions.length > 0 && comment.reactions.length}
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Comments Section */}

          {/* End Comments Section */}
        </Box>
      )}
    </>
  );
};

const PostReactions = ({
  reactionHandle,
}: {
  reactionHandle: (
    reaction:
      | "like"
      | "love"
      | "celebrate"
      | "insightful"
      | "curious"
      | "support"
      | "funny"
  ) => void;
}) => {
  const reactions: (
    | "like"
    | "love"
    | "celebrate"
    | "insightful"
    | "curious"
    | "support"
    | "funny"
  )[] = [
    "like",
    "love",
    "celebrate",
    "insightful",
    "curious",
    "support",
    "funny",
  ];

  const theme: ThemeInterface = useTheme();
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: -20,
        left: 0,
        bgcolor: theme.colors.textBackground,
        display: "flex",
        gap: 1,
        borderRadius: 2,
        height: 40,
        zIndex: 1,
        backdropFilter: "blur(40px)",
      }}
    >
      {reactions.map((reaction, index) => {
        const [size, setSize] = useState<"small" | "medium" | "large">("small");
        const [dimessions, setDimessions] = useState({
          height: 30,
          width: 30,
        });
        return (
          <Tooltip
            title={capitalizeFirstLetter(reaction)}
            key={index}
            placement="top"
          >
            <IconButton
              onMouseOver={() => {
                setDimessions({
                  height: 40,
                  width: 30,
                });
                setSize("large");
              }}
              onClick={() => reactionHandle(reaction)}
              onMouseLeave={() => {
                setDimessions({
                  height: 30,
                  width: 30,
                });
                setSize("small");
              }} // Set size back to "small" when mouse leaves
              color="secondary"
              size={size}
            >
              {reactionIcon(reaction, dimessions)}
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};

const reactionIcon = (
  reaction: string,
  dimessions: {
    height: number;
    width: number;
  }
) => {
  switch (reaction) {
    case "like":
      return (
        <ThumbsUpIcon width={dimessions.width} height={dimessions.height} />
      );
    case "love":
      return <HeartIcon width={dimessions.width} height={dimessions.height} />;
    case "celebrate":
      return (
        <CelebrateIcon width={dimessions.width} height={dimessions.height} />
      );
    case "insightful":
      return <BulbIcon width={dimessions.width} height={dimessions.height} />;
    case "curious":
      return (
        <ThinkinhFaceIcon width={dimessions.width} height={dimessions.height} />
      );
    case "support":
      return (
        <HandHoldingHeartIcon
          width={dimessions.width}
          height={dimessions.height}
        />
      );
    case "funny":
      return <FunnyIcon width={dimessions.width} height={dimessions.height} />;
    default:
      return null;
  }
};
