const express = require("express");

const Router = express.Router();

// definisikan product router
// ./ untuk akses dalam folder yang sama
const productRouter = require("./product");
const authRouter = require("./auth");

// endpoint
Router.use("/product", productRouter);
Router.use("/auth", authRouter);

// ekspor
module.exports = Router;
