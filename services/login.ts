import axios from "axios";
import config from "../config/index";

const signIn = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  const response = await axios.post(`${config.SERVER_ADDRESS}/api/v1/login/`, {
    email,
    password,
  });
  if (response.status == 200) {
    const responseFromSecreteServer = await axios.post(
      `${config.SECRETE_SERVER_ADDRESS}/api/v1/authorization`,
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

const signUp = async (data: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  birthday: string;
  gender: string;
}) => {
  if (data) {
    const { email, password, firstname, lastname, username, birthday, gender } =
      data;
    const response = await axios.post(
      `${config.SERVER_ADDRESS}/api/v1/login/signup`,
      {
        email,
        password,
        firstname,
        lastname,
        username,
        birthday,
        gender,
      }
    );

    if (response.status == 201) {
      const responseFromSecreteServer = await axios.post(
        `${config.SECRETE_SERVER_ADDRESS}/api/v1/authorization`,
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
  const response = await axios.get(`${config.SERVER_ADDRESS}/users/`);
  return response.data;
};
export default { signIn, signUp, getUsers };
