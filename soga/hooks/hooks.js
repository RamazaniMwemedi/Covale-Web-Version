const { useEffect, useState } = require("react");
const { useRouter } = require("next/router");

const { getChatById } = require("../services/chats");
const { sendMessege } = require("../services/messages");

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
const[loading, setLoading] = useState(true);
  // Get chat by id and set it to chat
  useEffect(() => {
    if ((token, id)) {
      getChatById(token, id).then((res) => {
        setChat(res);
        setLoading(false);
      });
    }
  }, [token, id]);
  return { chat, loading };
};

module.exports = {
  useCheckLogedinUser,
  useGetChatById,
};
