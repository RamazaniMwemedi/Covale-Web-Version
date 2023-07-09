import React, { useState } from "react";
import { Box, Typography, Avatar, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/styles";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
// My modules

const Friend = ({ friend, token }) => {
  const theme = useTheme();
  const [messege, setMessege] = useState("");

  // Friend Component
  return (
    <>
      {friend && (
        <Box
          sx={{
            borderRadius: "10px",
            width: 300,
            padding: "3px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "lightgray",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // backgroundColor: theme.colors.background1,
            "&:hover": {
              boxShadow: 4,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: "70px",
                height: "70px",
                margin: "10px",
              }}
              src={friend.profilePic.fileUrl}
            />
            {/* Friend Details */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Link
                  href={`/profile/${friend.id}`}
                  underline="none"
                  sx={{
                    pl: 0,
                    display: "flex",
                    gap: 1,
                    color: "unset",
                  }}
                >
                  <Typography variant="h6" component="p">
                    {friend.firstname}
                  </Typography>
                  <Typography variant="h6">{friend.lastname}</Typography>
                </Link>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  component={"p"}
                  color="text.secondary"
                >
                  @{friend.username}
                </Typography>
                <Typography
                  variant="caption"
                  component={"p"}
                  color="text.secondary"
                >
                  {friend.professionalSummary}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <IconButton>
              <MoreHorizRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Friend;
