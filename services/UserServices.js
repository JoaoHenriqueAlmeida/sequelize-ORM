const Joi = require('joi');
const { User } = require('../models');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

const responseValidate = (status = 200, message = '', data = {}) => ({
  status,
  message,
  data,
});

const createUser = async (user) => {
  try {
    const { error } = schema.validate(user);
    if (error) {
     return responseValidate(400, error.message);
    }
    const findByEmail = await User.findOne({ where: { email: user.email } });
    console.log(findByEmail);
    if (findByEmail) {
      return responseValidate(409, 'User already registered');
    }
    const newUser = await User.create(user);
    return responseValidate(201, '', newUser);
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

module.exports = {
  createUser,
};