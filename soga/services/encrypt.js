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

module.exports = {
  generateNewKeyPair,
};
