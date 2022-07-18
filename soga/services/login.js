import axios from "axios";

const signIn = async (data) => {
  const { email, password } = data;
  const response = await axios.post("http://localhost:5005/api/login/", {
    email,
    password,
  });
  return response.data;
};

const signUp = async (data) => {
  const { email, password, firstname, lastname, username, birthday, gender } =
    data;
  const response = await axios.post("http://localhost:5005/api/users/", {
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
  const response = await axios.get("http://localhost:5005/api/users/");
  return response.data;
};
export default { signIn, signUp, getUsers };
