import { Avatar, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { RootState, ThemeInterface } from "../../../interfaces/myprofile";
import { useSelector } from "react-redux";
import { EventIcon, FileIcon, ImageIcon } from "../../../assets/Icons";

const PostRight = () => {
  return (
    <>
      <AddANewPost />
    </>
  );
};

const AddANewPost = () => {
  const theme: ThemeInterface = useTheme();

  const userStore = useSelector((state: RootState) => state.user);
  const user = userStore?.user;
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

              <Box
                sx={{
                  bgcolor: theme.colors.textBackground,
                  width: "100%",
                  p: 1,
                  borderRadius: 3,
                  cursor: "pointer",
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  Publish an Update
                </Typography>
              </Box>
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
              <Typography
                sx={{
                  alignItems: "center",
                  display: "flex",
                  gap: 1,
                  bgcolor: theme.colors.textBackground,
                  p: 1,
                  borderRadius: 3,
                  cursor: "pointer",
                }}
              >
                <ImageIcon height={24} width={24} />
                Photos / Video
              </Typography>
              <Typography
                sx={{
                  alignItems: "center",
                  display: "flex",
                  gap: 1,
                  bgcolor: theme.colors.textBackground,
                  p: 1,
                  borderRadius: 3,
                  cursor: "pointer",
                }}
              >
                <FileIcon height={24} width={24} />
                Files
              </Typography>
              <Typography
                sx={{
                  alignItems: "center",
                  display: "flex",
                  gap: 1,
                  bgcolor: theme.colors.textBackground,
                  p: 1,
                  borderRadius: 3,
                  cursor: "pointer",
                }}
              >
                <EventIcon height={24} width={24} />
                Event
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PostRight;
