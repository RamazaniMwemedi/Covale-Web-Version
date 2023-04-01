const { default: axios } = require("axios");
const { SECRETE_SERVER_ADDRESS } = require("../config/index");

const generateNewKeyPair = async (modelName, modelId, secreteToken) => {
  const response = await axios.post(
    `${SECRETE_SERVER_ADDRESS}/api/v1/keys/generate`,
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

const getKeyPairs = async (secreteToken) => {
  const response = await axios.get(
    `${SECRETE_SERVER_ADDRESS}/api/v1/keys`,

    {
      headers: {
        Authorization: `Bearer ${secreteToken}`,
      },
    }
  );
  return response.data;
};

const encryptMessage = async (message, privateKey) => {
  const response = await axios.post(`/api/encrypt`, {
    text: message,
    privateKey: privateKey,
  });
  return response.data.message;
};

const decryptMessage = async (message, publicKey) => {
  const response = await axios.post(`/api/decrypt`, {
    text: message,
    publicKey: publicKey,
  });
  return response.data.message;
};

module.exports = {
  generateNewKeyPair,
  getKeyPairs,
  encryptMessage,
  decryptMessage,
};
