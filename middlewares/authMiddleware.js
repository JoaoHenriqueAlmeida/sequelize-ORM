const jwt = require('jsonwebtoken');
const SECRET = require('../config/secret');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const user = jwt.verify(authorization, SECRET);

    if (user) {
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};