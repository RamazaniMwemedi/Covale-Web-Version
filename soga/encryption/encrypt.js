const { publicEncrypt } = require("crypto");
const { compressString } = require("./compress");

// Encrypts a message using the public key of the recipient
async function encryptString(string, recipientPublicKey) {
  if (!string || !recipientPublicKey) return null;
  const compressedSting = await compressString(string);
  console.log("Conmpressed string length: ", compressedSting.length);
  const encryptedString = publicEncrypt(
    recipientPublicKey,
    compressedSting
  ).toString("base64");
  return encryptedString;
}

module.exports = { encryptString };
