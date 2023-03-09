const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.db");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRoutePath = "/api/users";
    // Conectar a base de datos
    this.connectedDB();

    // Middlewares
    this.middlewares();

    // Rutas de la aplicacion
    this.routes();
  }

  async connectedDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del Body
    this.app.use(express.json());

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
