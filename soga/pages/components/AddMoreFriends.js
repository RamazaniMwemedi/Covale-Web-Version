import { Box, Divider, IconButton, ListItem, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useGetFriends } from "../../hooks/hooks";

const AddMoreFriends = ({ closeMorePeopleHandler }) => {
  const friends = useGetFriends();
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "400px",
        width: "271px",
        position: "fixed",
        bottom: "0px",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        blur: "5px",
        backgroundColor: theme.colors.background1,
        position: "fixed",
        zIndex: "1",
      }}
    >
      <Box
        sx={{
          padding: "3px",
          position: "sticky",
          top: "0px",
          zIndex: "1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Friends</Typography>
          <IconButton
            sx={{
              marginTop: "6px",
              backgroundColor: theme.colors.itemBackground,
              "&:hover": {
                backgroundColor: theme.colors.background2,
              },
            }}
            onClick={() => {
              closeMorePeopleHandler();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
      </Box>
      {/* Friends */}
      <Box
        sx={{
          overflow: "scroll",
          height: "400px",
        }}
      >
        {friends.loading ? (
          <Stack spacing={1}>
            {[...Array(5)].map((_, i) => (
              <ListItem
                key={i}
                sx={{
                  display: "flex",
                  // border style
                  borderStyle: " solid ",
                  // border color
                  borderColor: "lightgrey",
                  // border width
                  borderWidth: "2px",
                  borderRadius: "0.5rem",
                }}
              >
                {/* Avatar skeleton */}
                <Skeleton
                  variant="circle"
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
                {/* Skeleton for user first and lastname */}
                <Box sx={{}}>
                  <Skeleton
                    variant="rect"
                    width={185}
                    height={20}
                    style={{ marginLeft: "10px" }}
                  />
                  <Skeleton
                    variant="rect"
                    width={185}
                    height={8}
                    style={{ marginLeft: "10px", marginTop: "8px" }}
                  />
                </Box>
              </ListItem>
            ))}
            {/* A skeleton of ListItem skeleton for chat */}
          </Stack>
        ) : friends.friends.length > 0 ? (
          friends.friends.map((friend, i) => {})
        ) : (
          <Typography variant="h6">No friends</Typography>
        )}
      </Box>
      {/* End of friends */}
    </Box>
  );
};

export default AddMoreFriends;
