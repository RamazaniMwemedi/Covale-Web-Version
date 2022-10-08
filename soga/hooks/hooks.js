const { useEffect, useState, useLayoutEffect } = require("react");
const { useRouter } = require("next/router");

const { getChatById } = require("../services/chats");
const { getTeamById } = require("../services/teams");
const { myFriends } = require("../services/user");

// React-Redux hooks
const { useDispatch } = require("react-redux");

// Reducers
const { teamAdd, teamReset } = require("../Redux/slices/team");
const { chatAdd, chatReset } = require("../Redux/slices/chat");

//    Team Reducer

const useCheckLogedinUser = () => {
  const [logedInUser, setLogedInUser] = useState("");
  const router = useRouter();
  useEffect(() => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (signedInUser) {
      setLogedInUser(JSON.parse(signedInUser));
    } else {
      router.push("/login");
    }
  }, []);

  return logedInUser;
};
const useCheckLogedinUserToken = () => {
  const [logedInUser, setLogedInUser] = useState("");
  const [logedInUserToken, setLogedInUserToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (signedInUser) {
      setLogedInUser(JSON.parse(signedInUser));
      if (logedInUser) {
        setLogedInUserToken(logedInUser.token);
      }
    } else {
      router.push("/login");
    }
  }, [logedInUser]);

  return logedInUserToken;
};

const useGetChatById = (token, id) => {
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // Get chat by id and set it to chat
  useEffect(() => {
    setLoading(true);
    // Clear Chat Store
    dispatch(chatReset);
    if ((token, id)) {
      getChatById(token, id).then((res) => {
        setChat(res);
        setLoading(false);
      });
    }
    if (chat) {
      dispatch(chatAdd(chat));
    }
  }, [token, id]);
  return { chat, loading };
};
const useGetTeamById = (token, id) => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Get chat by id and set it to chat
  useEffect(() => {
    setLoading(true);
    // Clear Team store
    dispatch(teamReset());
    if ((token, id)) {
      getTeamById(token, id).then((res) => {
        setTeam(res);
        setLoading(false);
      });
    }
  }, [token, id]);
  if (team) {
    dispatch(teamAdd(team));
  }
  return { team, loading };
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
  const [friends, setFriends] = useState(null);
  const [logedInUser, setLogedInUser] = useState("");
  const router = useRouter();
  useEffect(() => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (signedInUser) {
      setLogedInUser(JSON.parse(signedInUser));
    } else {
      router.push("/login");
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

const useWindow = () => {
  const [myWindow, setMyWindow] = useState(null);
  useLayoutEffect(() => {
    if (window) {
      setMyWindow(window);
    }
    return () => {
      setMyWindow(null);
    };
  }, []);
  return myWindow;
};

module.exports = {
  useCheckLogedinUser,
  useCheckLogedinUserToken,
  useGetChatById,
  useGetTeamById,
  useGetTheme,
  useGetFriends,
  useWindow,
};
