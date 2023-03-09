const { privateDecrypt } = require("crypto");
const { decompressString } = require("./compress");

// Decrypts a message using the public key of the recipient
function decryptString(string, recipientPrivateKey) {
  const decryptedMessage = privateDecrypt(
    recipientPrivateKey,
    string
  );

  const decompressedString = decompressString(decryptedMessage);
  return decompressedString;
}

module.exports = { decryptString };
