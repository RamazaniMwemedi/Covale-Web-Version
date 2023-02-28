import axios from "axios";
const { SERVER_ADDRESS } = require("../config/index");

const signIn = async (data) => {
  const { email, password } = data;
  const response = await axios.post(`${SERVER_ADDRESS}/api/v1/login/`, {
    email,
    password,
  });
  return response.data;
};

const signUp = async (data) => {
  const { email, password, firstname, lastname, username, birthday, gender } =
    data;
  const response = await axios.post(`${SERVER_ADDRESS}/api/v1/login/signup`, {
    email,
    password,
    firstname,
    lastname,
    username,
    birthday,
    gender,
  });
  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(`${SERVER_ADDRESS}/users/`);
  return response.data;
};
export default { signIn, signUp, getUsers };
