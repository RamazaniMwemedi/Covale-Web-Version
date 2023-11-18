import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Typography } from "@mui/material";
import { Avatar, IconButton } from "@mui/material";
import { useTheme } from "@mui/styles";

import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { ThemeInterface } from "../../../interfaces/myprofile";

const ChatSectionSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        marginLeft: "-65px",
      }}
    >
      {/* ChatSectionLefft */}
      <Box
        sx={{
          flex: "65%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        <TopBar />
        <Left />
      </Box>
    </Box>
  );
};

export default ChatSectionSkeleton;

const TopBar = () => {
  const theme: ThemeInterface = useTheme();
  return (
    <Box
      sx={{
        height: "4rem",
        backgroundColor: theme.colors.background1,
        // centered
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        paddingLeft: "5px",
        // z-index
        zIndex: "1",
        // border
        borderBottom: "1px solid #e0e0e0",
        borderRight: "1px solid #e0e0e0",
        webkitBackdropFilter: "blur(10px)",
        position: "sticky",
        top: "0px",
        padding: "3px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "40%",
          gap: "5px",
          // centerd
          alignItems: "center",
          // textAlign: "center",
          justifyContent: "space-between",
        }}
      >
        <Skeleton variant="circular" width={45} height={45} />
        <Skeleton variant="text" width={"100%"} height={40} />
      </Box>
      <Box
        sx={{
          display: "flex",
          // centered
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          gap: "3px",
        }}
      >
        {/* Icon skeleton */}
        <Skeleton variant="circular" width={35} height={35} />
        <Skeleton variant="circular" width={35} height={35} />
      </Box>
    </Box>
  );
};

const Bottom = () => {
  return (
    <Box
      sx={{
        height: "3rem",
        display: "flex",
        // Be at the bottom of the page
        verticalAlign: "bottom",
        width: "100%",
        // centered
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          // alignItems: "center",
          padding: "5px",
          gap: "5px",
        }}
      >
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>

      {/* Communication */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          border: "1px solid #e0e0e0",
          borderRadius: "15px",
          height: "70%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px",
            gap: "5px",
          }}
        >
          <Skeleton variant="circular" width={28} height={28} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px",
            gap: "5px",
          }}
        >
          <Skeleton variant="circular" width={28} height={28} />
        </Box>
      </Box>
    </Box>
  );
};

const Mid = () => {
  // Skeleton for the middle of the chat of sender and receiver
  return (
    <Box>
      <Box
        sx={{
          overflowY: "scroll",
          height: "85vMin",
          margin: "0px",
          padding: "0px",
        }}
      >
        {/* Array of messages skeletons of sender and receiver */}
        {Array.from({ length: 11 }, (_, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                // centerd
                alignItems: "center",
                textAlign: "center",
                // FLoat right
                // If the index is even justify content is flex-end
                justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
                // If the index is even margin right is 10px
                marginRight: index % 2 === 0 ? "10px" : "0px",
                // If the index is even margin left is 0px
                marginLeft: index % 2 === 0 ? "0px" : "10px",
                // If the index is even padding right is 10px
              }}
            >
              {index % 2 === 0 ? (
                <Skeleton
                  variant="rectangular"
                  sx={{
                    backgroundColor: "purple",
                    // centered
                    display: "flex",
                    // paddingLeft: "5px",
                    // paddingRight: "5px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "12px",
                    width: "auto",
                    height: "auto",
                    marginBottom: "10px",
                    borderBottomRightRadius: "0px",
                    // max width 80%
                    maxWidth: "80%",
                    marginRight: "6px",
                  }}
                  width={"80%"}
                  height={50}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    // centerd
                    alignItems: "center",
                    textAlign: "center",
                    // FLoat right
                    justifyContent: "flex-start",
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={25}
                    height={25}
                    sx={{ marginRight: "6px" }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                      // centered
                      display: "flex",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      borderRadius: "7px",
                      width: "auto",
                      height: "auto",
                      marginBottom: "10px",
                      borderBottomLeftRadius: "0px",
                      // max width 80%
                      maxWidth: "80%",
                    }}
                    width={400}
                    height={30}
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const Left = () => {
  return (
    <Box
      sx={{
        flex: "55%",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        borderRight: "1px solid #e0e0e0",
        paddingBottom: "2px",
      }}
    >
      {/* Top */}

      {/* Mid */}
      <Box
        sx={{
          marginLeft: "5px",
          marginRight: "5px",
          marginTop: "105px",
        }}
      >
        <Mid />
      </Box>
      {/* Bottom */}
      <Box>
        <Bottom />
      </Box>
    </Box>
  );
};

// Right
const Right = () => {
  return (
    <Box>
      <Skeleton
        variant="circular"
        sx={{
          position: "fixed",
          top: "1",
          right: "0",
        }}
        width={30}
        height={30}
      />
      <Box
        sx={{
          // Center this section
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginLeft: "120px",
          // Padding
        }}
      >
        <Friend />
      </Box>
    </Box>
  );
};

const Friend = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "25px",
      }}
    >
      <Skeleton variant="circular" sx={{ width: "120px", height: "120px" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Skeleton
          variant="text"
          sx={{
            paddingTop: "30px",
          }}
          width={120}
          height={20}
        />
        {/* Status */}
        <Skeleton
          variant="text"
          sx={{
            paddingTop: "10px",
          }}
          width={50}
          height={20}
        />
      </Box>
    </Box>
  );
};
