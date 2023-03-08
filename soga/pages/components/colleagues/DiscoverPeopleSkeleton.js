import * as React from "react";
import { Box } from "@mui/system";
import {Skeleton} from "@mui/material";


// A random array
const friends = Array.from({ length: 9 }, (v, k) => k)
  .map((v) => {
    return {
      id: v,
      name: `Friend ${v}`,
      avatar: `https://picsum.photos/200/300?random=${v}`,
    };
  })
  .reverse();

export default function DiscoverPeopleSkeleton() {
  return (
    <Box
      sx={{
        //  Grid

        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, 210px)",
        gap: 2,
        alignContent: "center",
        columnGap: "45px",
        rowGap: "15px",
      }}
    >
      {friends.map((friend) => {
        return (
          <Box key={friend.id}>
            <Friend />
          </Box>
        );
      })}
    </Box>
  );
}

const Friend = () => {
  const [requestSent, setRequestSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  return (
    <Box
      sx={{
        borderRadius: "10px",
        width: "110%",
        padding: "3px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "lightgray",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px",
        alignItems: "center",
      }}
    >
      <Skeleton
        sx={{
          display: "flex",
          borderTopRightRadius: "5px",
          borderTopLeftRadius: "5px",
        }}
        height={"65px"}
        width={"100%"}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
          marginTop: "-22px",
          padding: "-10px",
        }}
      >
        <Skeleton variant="circular" height={48} width={48} />{" "}
        <Box
          sx={{
            marginTop: "7px",
            marginLeft: "-10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              gap: 1,
            }}
          >
            <Skeleton variant="text" height={16} width={100} />{" "}
            <Skeleton variant="text" height={16} width={100} />
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Skeleton variant="text" height={16} width={80} />
          </Box>
        </Box>
        <br />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Skeleton varaint="text" height={18} width={35} />
        <Skeleton varaint="text" height={18} width={35} />
        <Skeleton varaint="text" height={18} width={35} />
      </Box>
      <Box
        sx={{
          display: "flow",
        }}
      >
        <Skeleton
          variant="rect"
          height={30}
          sx={{ marginTop: "6px", borderRadius: "5px" }}
          width={"100%"}
        />

        <Skeleton
          variant="rect"
          sx={{ marginTop: "6px", borderRadius: "5px", marginBottom: "6px" }}
          height={30}
          width={"100%"}
        />
      </Box>
    </Box>
  );
};
