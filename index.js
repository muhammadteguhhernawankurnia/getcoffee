// import package express
const express = require("express");
const mainRouter = require("./src/routes/index");
const db = require("./src/config/db");

// create express application
const server = express();
const PORT = 8080;

// jika db konek kita jalankan server
db.connect()
  .then(() => {
    console.log("DB Connected");
    // pasang middleware global
    // handler body form url endcoded
    server.use(express.urlencoded({ extended: false }));
    // handler/middleware untuk body raw json
    server.use(express.json());
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
