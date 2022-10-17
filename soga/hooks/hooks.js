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
const { addUser, removeUser } = require("../Redux/slices/user");

// Services
const { findUserById } = require("../services/user");
const useCheckLogedinUser = () => {
  const [logedInUser, setLogedInUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (signedInUser) {
      setLogedInUser(JSON.parse(signedInUser));
    } else {
      router.push("/login");
    }
    if (logedInUser) {
      setToken(logedInUser.token);
    }
  }, [logedInUser]);

  useEffect(() => {
    let userObject;
    if (token) {
      findUserById(token, logedInUser.id).then((res) => {
        if (res.status != 200) {
          router.push("/login");
        }
        userObject = {
          id: res.data._id,
          username: res.data.username,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          birthday: res.data.birthday,
          gender: res.data.gender,
          email: res.data.email,
        };
        dispatch(addUser(userObject));
      });
    }
    return () => {
      dispatch(removeUser());
    };
  }, [token]);

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
  const router = useRouter();

  const dispatch = useDispatch();

  // Get chat by id and set it to chat
  useEffect(() => {
    // Clear Chat Store
    dispatch(chatReset);
    if (router.pathname.includes("chats/c")) {
      if ((token, id)) {
        getChatById(token, id).then((res) => {
          dispatch(chatAdd(res));
        });
      }
    }
  }, [token, id]);
};
const useGetTeamById = (token, id) => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  // Get chat by id and set it to chat
  useEffect(() => {
    setLoading(true);
    // Clear Team store
  
    dispatch(teamReset());
    if (router.pathname.includes("chats/t")) {
      if ((token, id)) {
        getTeamById(token, id).then((res) => {
          setTeam(res);
          setLoading(false);
        });
      }
    }
  }, [token, id]);
  if (team) {
    dispatch(teamAdd(team));
  }
  return loading;
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
