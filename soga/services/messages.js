import { io } from "socket.io-client";
const socket = io("http://localhost:5005");

const create = (message) => {
    console.log(message)
  socket.emit("message", message);
  socket.on("message", (message) => {
    console.log(message);
  });
};

// export
export default {
  create,
};
