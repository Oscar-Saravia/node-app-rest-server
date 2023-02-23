const express = require("express");
const cors = require("cors");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRoutePath = "/api/users";
    // Middlewares
    this.middlewares();

    // Rutas de la aplicacion
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del Body
    this.app.use(express.json())

    // Middleware para el uso de la carpeta public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userRoutePath, require("../routes/user.router"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto: ", this.port);
    });
  }
}

module.exports = Server;
