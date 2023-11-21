import axios from "axios";
import config from "../config/index";

export const generateNewKeyPair = async (
  modelName: string,
  modelId: string,
  secreteToken: string
) => {
  const response = await axios.post(
    `${config.SECRETE_SERVER_ADDRESS}/api/v1/keys/generate`,
    {
      modelName,
      modelId,
    },
    {
      headers: {
        Authorization: `Bearer ${secreteToken}`,
      },
    }
  );
  return response.data;
};

export const getKeyPairs = async (secreteToken: string) => {
  const response = await axios.get(
    `${config.SECRETE_SERVER_ADDRESS}/api/v1/keys`,

    {
      headers: {
        Authorization: `Bearer ${secreteToken}`,
      },
    }
  );
  return response.data;
};

export const encryptMessage = async (message: string, privateKey: string) => {
  const response = await axios.post("/api/encrypt", {
    text: message,
    privateKey: privateKey,
  });
  return response.data.message;
};

export const decryptMessage = async (message: string, publicKey: string) => {
  if (!message || !publicKey) return Promise.resolve("");

  const response = await axios.post("/api/decrypt", {
    text: message,
    publicKey: publicKey,
  });
  return response.data.message;
};

const mod = {
  generateNewKeyPair,
  getKeyPairs,
  encryptMessage,
  decryptMessage,
};

export default mod;
