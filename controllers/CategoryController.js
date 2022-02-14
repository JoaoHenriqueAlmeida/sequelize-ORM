const CategoryServices = require('../services/CategoryServices');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { status, message, data } = await CategoryServices.newCategory({ name });
  if (status >= 400) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(data);
};

module.exports = {
  createCategory,
};
