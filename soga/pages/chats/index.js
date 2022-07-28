import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";

// My components
import DrawerComponent from "../components/DrawerComponent";
import ChatLeft from "../components/ChatLeft";
import ChatSection from "../components/ChatSection";

import { getChatById } from "../../services/chats";
import { sendMessageChatRoom } from "../../services/messages";

// Hooks
import { useCheckLogedinUser, useGetChatById } from "../../hooks/hooks";
import ChatSectionSkeleton from "../components/ChatSectionSkeleton";

export default function Chat() {
  var user = useCheckLogedinUser();
  const router = useRouter();
  const  id  = router.query.t;
  const token = user ? user.token : null;
  const chat = useGetChatById(token, id);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ((token, id)) {
      getChatById(token, id).then((res) => {
        setMessages(res.chat.messege);
      });
    }
  }, [token, id]);

  const friendUsername = chat
    ? chat.friend.id !== user.id
      ? `${chat.friend.firstname}  ${chat.friend.lastname}`
      : ""
    : "";

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const signoutHandler = () => {
    router.push("/");
    localStorage.removeItem("logedinUser");
    user = null;
  };

  const sendMessageHandle = () => {
    if (message.length > 0) {
      const newMessage = {
        message: message,
      };
      sendMessageChatRoom(id, token, newMessage).then((res) => {
        setMessages([...messages, res]);
        setMessage("");
      });
    }
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "white", height: "100vh" }}>
      <CssBaseline />
      <DrawerComponent signoutHandler={signoutHandler} user={user} />
      <ChatLeft user={user} chat={chat} />
      <ChatSectionSkeleton/>
      {/* <ChatSection
        id={id}
        user={user}
        chat={chat}
        messageChangeHandler={messageChangeHandler}
        message={message}
        messages={messages}
        sendNewMessage={sendMessageHandle}
        friendUsername={friendUsername}
      /> */}
    </Box>
  );
}
