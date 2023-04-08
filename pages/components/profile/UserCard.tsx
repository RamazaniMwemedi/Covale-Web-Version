import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import Badge from "@mui/material/Badge";
import { useTheme } from "@mui/styles";
import { purple } from "@mui/material/colors";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

const UserCard = ({ user }) => {
  const theme: any = useTheme();
  return (
    <>
      {user && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            position: "relative",
          }}
        >
          {/* Avatar */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton
                sx={{
                  bgcolor: theme.colors.textBackground,
                }}
              >
                <CameraAltRoundedIcon color="action" />
              </IconButton>
            }
          >
            <Avatar
              sx={{
                width: 150,
                height: 150,
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
              }}
            >
              {user.firstname[0]} {user.lastname[0]}{" "}
            </Avatar>{" "}
          </Badge>

          {/* Name, and proffesional sumary */}
          <Box>
            <Typography variant="h4">
              {user.firstname} {user.lastname}{" "}
            </Typography>
            <Typography variant="body2">@{user.username}</Typography>
          </Box>
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
            <ModeEditRoundedIcon fontSize="small" /> Edit profile
          </Button>
        </Box>
      )}
    </>
  );
};

export default UserCard;

