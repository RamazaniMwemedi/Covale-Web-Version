import React, { FC, useState } from "react";
import { Box, Typography, Avatar, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/styles";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { ThemeInterface, UserInterFace } from "../../../interfaces/myprofile";
// My modules

const Colleague: FC<{ colleague: UserInterFace; token: string }> = ({
  colleague,
  token,
}) => {
  const theme: ThemeInterface = useTheme();

  // Friend Component
  return (
    <>
      {colleague && (
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
            backgroundColor: theme.colors.background1,
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
              src={colleague.profilePic.fileUrl}
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
                  href={`/profile/${colleague.id}`}
                  underline="none"
                  sx={{
                    pl: 0,
                    display: "flex",
                    gap: 1,
                    color: "unset",
                  }}
                >
                  <Typography variant="h6" component="p">
                    {colleague.firstname}
                  </Typography>
                  <Typography variant="h6">{colleague.lastname}</Typography>
                </Link>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  component={"p"}
                  color="text.secondary"
                >
                  @{colleague.username}
                </Typography>
                <Typography
                  variant="caption"
                  component={"p"}
                  color="text.secondary"
                >
                  {colleague.professionalSummary}
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

export default Colleague;
