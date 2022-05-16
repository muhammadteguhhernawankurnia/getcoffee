require("dotenv").config();
// import package express
const express = require("express");
const cors = require("cors");
const mainRouter = require("./src/routes/index");
const db = require("./src/config/db");
const logger = require("morgan");
// const { append } = require("express/lib/response");

// create express application
const server = express();
const PORT = 8080;

// jika db konek kita jalankan server
db.connect()
  .then(() => {
    console.log("DB Connected");
    // pasang middleware global
    server.use(
      logger(":method :url :status :res[content-length] - :response-time ms")
    );
    // handler body form url endcoded
    server.use(express.urlencoded({ extended: false }));
    // handler/middleware untuk body raw json
    server.use(express.json());

    // pasang cors
    const corsOptions = {
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };
    // server.use(cors(corsOptions));
    server.options("*", cors(corsOptions));

    // digunakan untuk membuka akses ke static file
    server.use(express.static("public"));

    // pasang server ke router
    server.use(mainRouter);

    // run server at PORT
    server.listen(PORT, () => {
      console.log(`Server is Running at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
