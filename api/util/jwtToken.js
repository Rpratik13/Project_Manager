const JWT = require('jsonwebtoken');
require('dotenv').config();

function createToken(data) {
  return JWT.sign({ ...data }, process.env.JWT_SECRET);
}

module.exports = {
  createToken
};