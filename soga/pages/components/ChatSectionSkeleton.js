import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Typography } from "@mui/material";
import { Avatar, IconButton } from "@mui/material";

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
      {/* ChatSectionRigth */}
      <Box
        sx={{
          flex: "40%",
          display: "flex",
        }}
      >
        <Right />
      </Box>
    </Box>
  );
};

export default ChatSectionSkeleton;

const TopBar = () => {
  return (
    <Box
      sx={{
        height: "4rem",
        backgroundColor: "whitesmoke",
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
          console.log(index);
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
    <Box
      sx={{
        flex: "55%",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        borderLeft: "1px solid #e0e0e0",
        paddingBottom: "2px",
        justifyContent: "space-between",
      }}
    >
      {/* Top */}
      <Friend />
    </Box>
  );
};

const Friend = ({ friendUsername }) => {
  return (
    <Box
      sx={{
        flex: "40%",
        display: "flex",
      }}
    >
      {/* Avatr  Name */}
      <Skeleton variant="circular" width={90} height={90} animation="wave" />
      <Box>
        <Skeleton variant="text" width={"100%"} height={25} animation="wave" />
        <Typography variant="body2">Mutual Team </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "5px",
            alignItems: "center",
            justifyContent: "center",

            maxHeight: "100px",
            overflowY: "scroll",
          }}
        >
          {Array.from(["Veloci", "Covalent", "SIR"], (team, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "whitesmoke",
                    boxShadow: 1,
                  },
                  borderRadius: "5px",
                  padding: "2px",
                }}
              >
                <Avatar sx={{ width: "30px", height: "30px" }}>
                  {team[0]}
                </Avatar>
                <Typography
                  sx={{
                    // Max width of the text
                    maxWidth: "100px",
                    // Text overflow
                  }}
                  color="secondary"
                  variant="caption"
                >
                  {/* Max text 3 characters else add ...*/}
                  {team.length > 3 ? team.substring(0, 3) + "..." : team}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
