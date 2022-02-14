const Joi = require('joi');
const { Category } = require('../models');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const responseValidate = (status = 200, message = '', data = {}) => ({
  status,
  message,
  data,
});

const newCategory = async ({ name }) => {
  try {
    const { error } = categorySchema.validate({ name });
    if (error) {
      return responseValidate(400, error.message);
    }
    const createCategory = await Category.create({ name });

    return responseValidate(201, '', createCategory);
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

const getAll = async () => {
  try {
    const getAllCategory = await Category.findAll();

    return responseValidate(200, '', getAllCategory);
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

module.exports = {
  newCategory,
  getAll,
};
