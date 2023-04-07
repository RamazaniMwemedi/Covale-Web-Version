const { publicEncrypt } = require("crypto");
const { compressString } = require("./compress");

// Encrypts a message using the public key of the recipient
async function encryptString(string, recipientPublicKey) {
  if (!string || !recipientPublicKey) return null;
  const compressedSting = await compressString(string);
  const encryptedString = publicEncrypt(
    recipientPublicKey,
    compressedSting
  ).toString("base64");
  return encryptedString;
}

module.exports = { encryptString };
