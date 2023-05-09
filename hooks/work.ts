import { addPosts } from "../Redux/slices/work";
import { getUserPosts } from "../services/work";
import { useCheckLogedinUserToken } from "./hooks";

const { useEffect, useState } = require("react");

const { useDispatch } = require("react-redux");

export const useGetUserPosts = (userId: string): boolean => {
  const token = useCheckLogedinUserToken();
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
