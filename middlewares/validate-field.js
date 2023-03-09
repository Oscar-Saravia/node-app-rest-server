const { response, request } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();   // Indica que una vez ejecutada esta funcion, pase al siguiente middleware.
};

module.exports = {
  validateFields,
};
