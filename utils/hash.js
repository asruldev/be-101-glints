const crypto = require("crypto");
const salt = "rahasia";

function encryptData(data, key) {
  const cipher = crypto.createCipher("aes-256-cbc", key = salt);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decryptData(data, key) {
  const decipher = crypto.createDecipher("aes-256-cbc", key = salt);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encryptData, decryptData }