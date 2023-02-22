const { publicEncrypt } = require("crypto");

// Encrypts a message using the public key of the recipient
function encryptChatMessage(message, recipientPublicKey) {
  const encryptedMessage = publicEncrypt(
    recipientPublicKey,
    Buffer.from(message)
  );
  return encryptedMessage;
}

// Encrypt a team message using the public keys of all the recipients
function encryptTeamMessage(message, recipientPublicKeys) {
  const encryptChatMessage = publicEncrypt(
    recipientPublicKeys,
    Buffer.from(message)
  );
  return encryptChatMessage;
}

module.exports = {
  encryptChatMessage,
  encryptTeamMessage,
};
