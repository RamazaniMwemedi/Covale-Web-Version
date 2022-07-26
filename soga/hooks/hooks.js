import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getChatById } from "../services/chats";

const useCheckLogedinUser = () => {
  const [logedInUser, setLogedInUser] = useState("");
  const router = useRouter();
  useEffect(() => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (signedInUser) {
      setLogedInUser(JSON.parse(signedInUser));
    } else {
      router.push("/");
    }
  }, []);

  return logedInUser;
};

const useGetChatById = (token, id) => {
  const [chat, setChat] = useState(null);
  // Get chat by id and set it to chat
  useEffect(() => {
    getChatById(token, id).then((res) => {
      setChat(res);
    });
  }, [id]);

  return chat;
};

export default {
  useCheckLogedinUser,
  useGetChatById,
  
};
