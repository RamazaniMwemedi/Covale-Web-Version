import axios from "axios";
const { SERVER_ADDRESS } = require("../config/index");
const { SECRETE_SERVER_ADDRESS } = require("../config/index");

const signIn = async (data) => {
  const { email, password } = data;
  const response = await axios.post(`${SERVER_ADDRESS}/api/v1/login/`, {
    email,
    password,
  });
  if (response.status == 200) {
    const responseFromSecreteServer = await axios.post(
      `${SECRETE_SERVER_ADDRESS}/api/v1/authorization`,
      {
        email,
        password,
      }
    );
    return {
      token: response.data.token,
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      secreteToken: responseFromSecreteServer.data.secretToken,
    };
  }
  return response.data;
};

const signUp = async (data) => {
  if (data) {
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

    if (response.status == 201) {
      const responseFromSecreteServer = await axios.post(
        `${SECRETE_SERVER_ADDRESS}/api/v1/authorization`,
        {
          email,
          password,
        }
      );

      return {
        token: response.data.token,
        id: response.data.id,
        username: response.data.username,
        name: response.data.name,
        email: response.data.email,
        birthday: response.data.birthday,
        secreteToken: responseFromSecreteServer.data.secretToken,
      };
    }
  }
};

const getUsers = async () => {
  const response = await axios.get(`${SERVER_ADDRESS}/users/`);
  return response.data;
};
export default { signIn, signUp, getUsers };
