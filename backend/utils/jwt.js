const jwt = require("jsonwebtoken");

exports.generateToken = (id, expiresIn = process.env.JWT_EXPIRE) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });

exports.verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);
