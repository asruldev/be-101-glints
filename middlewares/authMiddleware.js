const { sendErrorResponse } = require("../utils/sendResponse");
const salt = 'my_secret_key'
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const token = jwt.sign({ user }, salt);
    return token;
}

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return sendErrorResponse(res, 401, 'Authentication required');
  
  jwt.verify(token, salt, (err, payload) => {
    if (err) return sendErrorResponse(res, 401, 'Authentication Failed');
    
    req.user = payload.user;
    next();
  });
}

module.exports = {generateToken, verifyToken}