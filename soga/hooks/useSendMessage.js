import { useEffect } from "react";
import messageService from "../services/messages";

const useSendMessage = (friendId, token, message) => {
  useEffect(() => {
    if (friendId && token) {
      const message = messageService.sendMessege(friendId, token, message);
      return message;
    }
  }, [friendId, token]);
};

export default {
    useSendMessage
};
