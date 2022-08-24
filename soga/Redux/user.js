const { createStore } = require("redux");
const initialState = {
    username:"Username"
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return (state = payload);

    default:
      return state;
  }
};

const user = createStore(userReducer);
module.exports = user;