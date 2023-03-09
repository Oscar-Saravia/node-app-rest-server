const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUser,
  putUser,
  postUser,
  deleteUser,
  patchUser,
} = require("../controllers/users.controller");
const {
  rolValidated,
  emailValidated,
  userValidated,
} = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-field");

const router = Router();

router.get("/", getUser);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(userValidated),
    check("rol").custom(rolValidated),
    validateFields,
  ],
  putUser
);

router.post(
  "/",
  check("name", "El nombre es obligatorio.").not().isEmpty(),
  check(
    "password",
    "El password es obligatorio, debe tener mas de 6 caracteres."
  ).isLength({ min: 6 }),
  check("email", "El correo no es valido.").isEmail(),
  check("email").custom(emailValidated),
  // check("rol", "No es un ROL valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
  check("rol").custom(rolValidated),
  validateFields,
  postUser
);

router.delete(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(userValidated),
    validateFields
  ],
  deleteUser
);

router.patch("/", patchUser);

module.exports = router;
