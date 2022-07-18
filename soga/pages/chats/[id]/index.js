import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";

// My components
import DrawerComponent from "../../components/DrawerComponent";
import ChatLeft from "../../components/ChatLeft";
import ChatSection from "../../components/ChatSection";
import chatServices from "../../../services/chats";

export default function Chat({ signoutHandler }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");

  const messageChangeHandler = (e) => { 

    setMessage(e.target.value);
  }
  const sendMessageHandler =  () => {
    if (message) {
      const newMessage = {
        message,
        user: user._id,
        chat: chat._id,
      };
      
      }
    
  }
  const token = user ? user.token : null;

  useEffect((router) => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (signedInUser) {
      setUser(JSON.parse(signedInUser));
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (token && id) {
      chatServices.getChatById(token, id).then((chat) => {
        setChat(chat);
      });
    }
  }, [token, id]);

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
        messageChangeHandler={messageChangeHandler}
        sendMessageHandler={sendMessageHandler}
        message={message}
      />
    </Box>
  );
}
