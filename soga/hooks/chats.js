const { useEffect, useState } = require("react");
// React-Redux hooks
const { useDispatch, useSelector } = require("react-redux");

const useChatId = (id) => {
  const allChats = useSelector((state) => state.chats);
  console.log("Id is :", id);
  const [chat, setChat] = useState(null);
  useEffect(() => {
    if (allChats.chats) {
      if (allChats.chats.length > 0 && id) {
        setChat(allChats.chats.find((chat) => chat.id === id));
      }
    }
  }, [allChats, id]);

  return chat;
};

module.exports = {
  useChatId,
};
