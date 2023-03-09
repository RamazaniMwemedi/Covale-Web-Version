const zlib = require("zlib");

const compressString = async (inputString) => {
  return new Promise((resolve, reject) => {
    zlib.deflate(inputString, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const compressedString = buffer.toString("hex");
        resolve(compressedString);
      }
    });
  });
};

const decompressString = async (compressedString) => {
  const compressedBuffer = Buffer.from(compressedString, "hex");
  return new Promise((resolve, reject) => {
    zlib.inflate(compressedBuffer, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const decompressedString = buffer.toString();
        resolve(decompressedString);
      }
    });
  });
};

module.exports = {
  compressString,
  decompressString, 
};
