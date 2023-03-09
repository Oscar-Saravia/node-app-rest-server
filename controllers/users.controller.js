const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

// Metodo GET
const getUser = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const queryStatus = { state: true };
  // const users = await User.find(queryStatus)  // retorna la consulta, con la condicional
  // .limit(Number(limit)) // retorna la cantidad de datos de acuerdo al limite asignado
  // .skip(Number(since)); // retorna los datos desde el valor asignado

  // const total = await User.countDocuments(queryStatus); // retorna la cantidad de registros que cumplan con la condicional

  // Forma de llamar a la base de datos, reduce el tiempo de espera para obtener los resultados
  const [total, users] = await Promise.all([
    User.countDocuments(queryStatus),
    User.find(queryStatus) // retorna la consulta, con la condicional
      .limit(Number(limit)) // retorna la cantidad de datos de acuerdo al limite asignado
      .skip(Number(since)), // retorna los datos desde el valor asignado
  ]);
  res.json({
    msg: "Get All User - Controller",
    total,
    users,
  });
};

// Metodo POST
const postUser = async (req, res = response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(); // cantidad de vueltas para asegurar la encriptacion, ej: 10
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await user.save();

  res.json({
    msg: "Post User - Controller",
    user,
  });
};

// Metodo PUT
const putUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...otherArguments } = req.body;

  // TODO: Validar contra la base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // cantidad de vueltas para asegurar la encriptacion, ej: 10
    otherArguments.password = bcryptjs.hashSync(password, salt);
  }
  const userUpdated = await User.findByIdAndUpdate(id, otherArguments);

  res.json({
    msg: "Put User - Controller",
    userUpdated,
  });
};

// Metodo DELETE
const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  // Eliminar fisicamente
  // No recomendable, porque el usuario puede tener actividades registradas con sus datos
  // const user = await User.findByIdAndDelete(id);

  // Recomando: actualizar el estado del usuario, para que no sea visible en el frontend
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: "Delete User - Controller",
    user,
  });
};

// Metodo PATCH
const patchUser = (req, res = response) => {
  //   res.send("Hola Mundo - ");
  res.json({
    msg: "Patch User - Controller",
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
  patchUser,
};
