import axios from "axios";
const baseUrl = "https://covale.herokuapp.com";

const signIn = async (data) => {
  const { email, password } = data;
  const response = await axios.post(`${baseUrl}/api/login/`, {
    email,
    password,
  });
  return response.data;
};

const signUp = async (data) => {
  const { email, password, firstname, lastname, username, birthday, gender } =
    data;
  const response = await axios.post(`${baseUrl}/api/users/`, {
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
  const response = await axios.get(`${baseUrl}/users/`);
  return response.data;
};
export default { signIn, signUp, getUsers };
