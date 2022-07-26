import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";

// My components
import DrawerComponent from "../../components/DrawerComponent";
import ChatLeft from "../../components/ChatLeft";
import ChatSection from "../../components/ChatSection";

// Hooks
import { useCheckLogedinUser, useGetChatById } from "../../../hooks/hooks";

export default function Chat({ signoutHandler }) {
  var user = useCheckLogedinUser();
  const router = useRouter();
  const { id } = router.query;
  const token = user ? user.token : null;
  const chat = useGetChatById(token, id);
  const [message, setMessage] = useState("");

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  signoutHandler = () => {
    router.push("/");
    localStorage.removeItem("logedinUser");
    user = null;
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "white", height: "100vh" }}>
      <CssBaseline />
      <DrawerComponent signoutHandler={signoutHandler} user={user} />
      <ChatLeft user={user} chat={chat} />
      {/* <Typography variant="h4">{id}</Typography> */}
      <ChatSection id={id} user={user} chat={chat} message={message} />
    </Box>
  );
}
