const jwt = require('jsonwebtoken');
const SECRET = require('../config/secret');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(authorization, SECRET);

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: 'User dos not exist' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};