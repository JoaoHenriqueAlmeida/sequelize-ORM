const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secret = require('../config/secret');

const createSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const responseValidate = (status = 200, message = '', data = {}) => ({
  status,
  message,
  data,
});

const createUser = async (user) => {
  try {
    const { error } = createSchema.validate(user);
    if (error) {
     return responseValidate(400, error.message);
    }
    const findByEmail = await User.findOne({ where: { email: user.email } });

    if (findByEmail) {
      return responseValidate(409, 'User already registered');
    }

  await User.create(user);
    const token = jwt.sign(user.email, secret);

    return responseValidate(201, '', { token });
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

const userLogin = async ({ email, password }) => {
  try {
    const { error } = loginSchema.validate({ email, password });

    if (error) {
      return responseValidate(400, error.message);
    }

    const findByEmail = await User.findOne({ where: { email } });

    if (!findByEmail) {
      return responseValidate(400, 'Invalid fields');
    }

    const jwtConfig = {
      expiresIn: '3d',
    };

    const token = jwt.sign({ id: findByEmail.id }, process.env.JWT_SECRET, jwtConfig);

    return responseValidate(200, '', { token });
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();

    return responseValidate(200, '', users);
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return responseValidate(404, 'User does not exist');
    }

    return responseValidate(200, '', user);
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
};