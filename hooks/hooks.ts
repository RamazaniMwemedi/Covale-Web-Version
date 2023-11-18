import { useEffect, useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";

import chatServices from "../services/chats";
import { getTeamById } from "../services/teams";
import { myFriends } from "../services/user";

// React-Redux hooks
import { useDispatch } from "react-redux";

// Reducers
import { allChats, chatReset } from "../Redux/slices/chat";
import { addUser, removeUser } from "../Redux/slices/user";

// Services
import { findUserById } from "../services/user";
import { ChatInterface, UserInterFace } from "../interfaces/myprofile";
export const useCheckLogedinUser = () => {
  const [loading, setloading] = useState(true);
  var logedInUser: any;
  var token: string = "";
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (signedInUser) {
      logedInUser = JSON.parse(signedInUser);
    } else {
      router.push("/login");
    }
    if (logedInUser) {
      token = logedInUser.token;
    }
  }, [logedInUser]);

  useEffect(() => {
    let userObject;

    if (token) {
      findUserById(token, logedInUser.id).then((res) => {
        if (!res) {
          router.push("/login");
        }
        if (res) {
          userObject = {
            ...res.data,
            token,
          };
          dispatch(addUser(userObject));
          setloading(false);
        }
      });
    }
    return () => {
      setloading(true);
    };
  }, [token]);

  return loading;
};
export const useCheckLogedinUserToken = () => {
  let [logedInUserToken, setLogedInUserToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (signedInUser) {
      setLogedInUserToken(JSON.parse(signedInUser).token);
    } else {
      router.push("/login");
    }
  }, [logedInUserToken]);

  return logedInUserToken;
};

export const useGetChats = (token: string) => {
  const router = useRouter();

  const dispatch = useDispatch();

  // Get chat by id and set it to chat
  useEffect(() => {
    // Clear Chat Store

    if (token) {
      chatServices.getChats(token).then((res: ChatInterface[]) => {
        dispatch(allChats(res));
      });
    }
  }, [token]);
};

export const useGetTheme = () => {
  const [theme, setTheme] = useState(false);
  useEffect(() => {
    const darkTheme = JSON.parse(localStorage.getItem("darkTheme") || "{}");
    if (darkTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(false);
    }
  }, []);
  return theme;
};

export const useGetFriends = () => {
  const [friends, setFriends] = useState<UserInterFace[]>([]);
  const [logedInUser, setLogedInUser] = useState<{
    token: string;
  } | null>();
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
    if (logedInUser && logedInUser.token) {
      myFriends(logedInUser.token).then((res) => {
        setFriends(res);
      });
    }
  }, [logedInUser && logedInUser.token]);

  return friends;
};

const useWindow = () => {
  const [myWindow, setMyWindow] = useState<(Window & typeof globalThis) | null>(
    null
  );
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

export const useUserId = () => {
  let logedInUser;
  const [id, setId] = useState("");
  useEffect(() => {
    const signedInUser = localStorage.getItem("logedinUser");
    if (signedInUser) {
      logedInUser = JSON.parse(signedInUser);
      setId(logedInUser.id);
    }
  }, [logedInUser]);
  return id;
};
const mod = {
  useCheckLogedinUser,
  useCheckLogedinUserToken,
  useGetChats,
  useGetTheme,
  useGetFriends,
  useWindow,
  useUserId,
};

export default mod;
