const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio."],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatorio."],
    unique: true,
  },
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  img: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Metodos personalizados para validar un correo
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject()
  return user
}
module.exports = model("User", UserSchema);
