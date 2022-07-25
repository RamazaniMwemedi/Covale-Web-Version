import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";

// My components
import DrawerComponent from "../../components/DrawerComponent";
import ChatLeft from "../../components/ChatLeft";
import ChatSection from "../../components/ChatSection";
import chatServices from "../../../services/chats";

// Hooks
import { useSendMessage } from "../../../hooks/useSendMessage";

export default function Chat({ signoutHandler }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };
 
  const token = user ? user.token : null;

  useEffect(() => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (signedInUser) {
      setUser(JSON.parse(signedInUser));
    } else {
      router.push("/");
    }
  }, []);

  const sendNewMessage = (friendId, token, message) => {
    const newMessage = useSendMessage(friendId, token, message);
    console.log(newMessage)
  };

  signoutHandler = () => {
    localStorage.removeItem("logedinUser");
    setUser(null);
    router.push("/");
  };

  console.log("User", user);
  return (
    <Box sx={{ display: "flex", backgroundColor: "white", height: "100vh" }}>
      <CssBaseline />
      <DrawerComponent signoutHandler={signoutHandler} user={user} />
      <ChatLeft user={user} chat={chat} />
      {/* <Typography variant="h4">{id}</Typography> */}
      <ChatSection
        id={id}
        user={user}
        chat={chat}
        message={message}
        sendNewMessage={sendNewMessage}
      />
    </Box>
  );
}
