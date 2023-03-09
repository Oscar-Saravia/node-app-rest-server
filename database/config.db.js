const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_DB_URL, {
    //   userNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   userCreateIndex: true,
    //   useFindAndModify: false,
    // });
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`Base de datos: EN LINEA ...`);
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar a la base de datos.");
  }
};

module.exports = {
  dbConnection,
};
