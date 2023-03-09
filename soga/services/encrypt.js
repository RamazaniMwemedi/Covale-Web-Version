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

// Get All Keys
const getAllKeys = async (secreteToken) => {
  const response = await axios.get(`${SECRETE_SERVER_ADDRESS}/api/v1/keys`, {
    headers: {
      Authorization: `Bearer ${secreteToken}`,
    },
  });
  return response.data;
};

module.exports = {
  generateNewKeyPair,
  getAllKeys,
};
