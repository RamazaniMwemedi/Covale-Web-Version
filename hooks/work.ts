import { addPosts } from "../Redux/slices/work";
import { getAllPosts, getUserPosts } from "../services/work";
import hookHooks from "./hooks";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

export const useGetUserPosts = (userId: string): boolean => {
  const token = hookHooks.useCheckLogedinUserToken();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && userId) {
      getUserPosts(token, userId).then((userPosts) => {
        if (userPosts) {
          dispatch(addPosts(userPosts));
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, [token, userId]);

  return loading;
};

// Get all posts

export const useGetAllPosts = (): boolean => {
  const token = hookHooks.useCheckLogedinUserToken();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      getAllPosts(token).then((userPosts) => {
        if (userPosts) {
          dispatch(addPosts(userPosts));
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  return loading;
};
