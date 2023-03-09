const Role = require("../models/rol");
const User = require("../models/user");

const rolValidated = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos.`);
  }
};

const emailValidated = async (email = "") => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email ${email} ya fue registrado en la base de datos.`);
  }
};

const userValidated = async (id) => {
  const existeUserId = await User.findById(id);
  if (!existeUserId) {
    throw new Error(`El ID ${id} no existe en la base de datos.`);
  }
};
module.exports = {
  rolValidated,
  emailValidated,
  userValidated,
};
