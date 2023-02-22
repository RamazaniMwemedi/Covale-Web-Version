const { privateDecrypt, publicEncrypt } = require("crypto");

// Decrypts a message using the public key of the recipient
function decryptChatMessage(encryptedMessage, recipientPrivateKey) {
  const decryptedMessage = privateDecrypt(
    recipientPrivateKey,
    encryptedMessage
  );
  return decryptedMessage;
}

// Decrypt a team message using the public keys of all the recipients
function decryptTeamMessage(encryptedMessage, recipientPrivateKeys) {
  const decryptedMessage = privateDecrypt(
    recipientPrivateKeys,
    encryptedMessage
  );
  return decryptedMessage;
}

module.exports = {
  decryptChatMessage,
  decryptTeamMessage,
};
