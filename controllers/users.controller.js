const { response, request } = require("express");

// Metodo GET
const getUser = (req = request, res = response) => {
  const params = req.query;

  res.json({
    msg: "Get User - Controller",
    params
  });
};

// Metodo POST
const postUser = (req, res = response) => {
  const body = req.body;

  res.json({
    msg: "Post User - Controller",
    body,
  });
};

// Metodo PUT
const putUser = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "Put User - Controller",
    id,
  });
};

// Metodo DELETE
const deleteUser = (req, res = response) => {
  //   res.send("Hola Mundo - ");
  res.json({
    msg: "Delete User - Controller",
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
