const { privateDecrypt } = require("crypto");
const { decompressString } = require("./compress");

// Decrypts a message using the public key of the recipient
async function decryptString(string, recipientPrivateKey) {
  if (!string || !recipientPrivateKey) return null;
  const decryptedMessage = privateDecrypt(
    recipientPrivateKey,
    Buffer.from(string, "base64")
  );

  const decompressedString = await decompressString(decryptedMessage);
  return decompressedString;
}

module.exports = { decryptString };
