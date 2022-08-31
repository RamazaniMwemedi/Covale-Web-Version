const { useEffect, useState, useLayoutEffect } = require("react");
const { useRouter } = require("next/router");

const { getChatById } = require("../services/chats");
const { sendMessege } = require("../services/messages");
const { myFriends } = require("../services/user");

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
  const [loading, setLoading] = useState(true);
  // Get chat by id and set it to chat
  useEffect(() => {
    setLoading(true);
    if ((token, id)) {
      getChatById(token, id).then((res) => {
        setChat(res);
        setLoading(false);
      });
    }
  }, [token, id]);
  return { chat, loading };
};

const useGetTheme = () => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const darkTheme = JSON.parse(localStorage.getItem("darkTheme"));
    if (darkTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(false);
    }
  }, []);
  return theme;
};

const useGetFriends = () => {
  const [friends, setFriends] = useState([]);
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

  useEffect(() => {
    if (logedInUser.token) {
      myFriends(logedInUser.token).then((res) => {
        setFriends(res);
      });
    }
  }, [logedInUser.token]);
  return friends;
};

module.exports = {
  useCheckLogedinUser,
  useGetChatById,
  useGetTheme,
  useGetFriends,
  
};
