import axios from "axios";
const { SERVER_ADDRESS, SECRETE_SERVER_ADDRESS } = require("../config/index");

const signIn = async (data) => {
  const { email, password } = data;
  const response = await axios.post(`${SERVER_ADDRESS}/api/v1/login/`, {
    email,
    password,
  });
  if (response.status === 200) {
    // Request for token from secrete server
    const secreteServerToken = await axios.post(
      `${SECRETE_SERVER_ADDRESS}/api/v1/authorization/`,
      {
        email,
        password,
      }
    );
    return { ...response.data, secreteServerToken: secreteServerToken.data };
  }
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
  // Request for token from secrete server
  if (response.status === 201) {
    const secreteServerToken = await axios.post(
      `${SECRETE_SERVER_ADDRESS}/api/v1/authorization/`,
      {
        email,
        password,
      }
    );
    return { ...response.data, secreteServerToken: secreteServerToken.data };
  }
};

const getUsers = async () => {
  const response = await axios.get(`${SERVER_ADDRESS}/users/`);
  return response.data;
};
export default { signIn, signUp, getUsers };
