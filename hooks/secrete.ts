import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import encryptMessageServices from "../services/encrypt";
import { allKeyPairs } from "../Redux/slices/keys";

export const useGetKeyPairs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const logedinUser = JSON.parse(localStorage.getItem("logedinUser") || "{}");
    const secreteToken = logedinUser && logedinUser.secreteToken;
    if (secreteToken) {
      encryptMessageServices.getKeyPairs(secreteToken).then((res) => {
        if (res) dispatch(allKeyPairs(res));
      });
    }
  }, []);
};

export const useGetSecreteToken = () => {
  const [secreteToken, setSecreteToken] = useState(null);
  useEffect(() => {
    const logedinUser = JSON.parse(localStorage.getItem("logedinUser") || "{}");
    const secreteToken = logedinUser && logedinUser.secreteToken;
    setSecreteToken(secreteToken.secreteToken);
  }, []);
  return secreteToken;
};

const mod = {
  useGetKeyPairs,
  useGetSecreteToken,
};

export default mod;
