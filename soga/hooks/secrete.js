const { useState, useEffect } = require("react");
const { useDispatch } = require("react-redux");
const { getKeyPairs } = require("../services/encrypt");
const { allKeyPairs } = require("../Redux/slices/keys");

const useGetKeyPairs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const secreteToken = JSON.parse(
      localStorage.getItem("logedinUser")
    ).secreteToken;
    console.log(secreteToken);
    if (secreteToken) {
      getKeyPairs(secreteToken).then((res) => {
        if (res) dispatch(allKeyPairs(res));
      });
    }
  }, []);
};

module.exports = {
  useGetKeyPairs,
};
