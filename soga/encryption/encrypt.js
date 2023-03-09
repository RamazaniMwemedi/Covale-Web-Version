const { publicEncrypt } = require("crypto");
const { compressString } = require("./compress");

// Encrypts a message using the public key of the recipient
function encryptString(string, recipientPublicKey) {
  const compressedSting = compressString(string);
  const encryptedString = publicEncrypt(
    recipientPublicKey,
    Buffer.from(compressedSting)
  );
  return encryptedString;
}

module.exports = { encryptString };
