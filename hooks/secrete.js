const { useState, useEffect } = require("react");
const { useDispatch } = require("react-redux");
const { getKeyPairs } = require("../services/encrypt");
const { allKeyPairs } = require("../Redux/slices/keys");

const useGetKeyPairs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const logedinUser = JSON.parse(localStorage.getItem("logedinUser"));
    const secreteToken = logedinUser && logedinUser.secreteToken;
    if (secreteToken) {
      getKeyPairs(secreteToken).then((res) => {
        if (res) dispatch(allKeyPairs(res));
      });
    }
  }, []);
};

const useGetSecreteToken = () => {
  const [secreteToken, setSecreteToken] = useState(null);
  useEffect(() => {
    const secreteToken = JSON.parse(localStorage.getItem("logedinUser"));
    setSecreteToken(secreteToken.secreteToken);
  }, []);
  return secreteToken;
};

module.exports = {
  useGetKeyPairs,
  useGetSecreteToken,
};
