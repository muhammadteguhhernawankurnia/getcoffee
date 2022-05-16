const express = require("express");

const Router = express.Router();

// definisikan product router
// ./ untuk akses dalam folder yang sama
const productRouter = require("./product");
const authRouter = require("./auth");
const userRouter = require("./user");

// endpoint
Router.use("/product", productRouter);
Router.use("/auth", authRouter);
Router.use("/user", userRouter);

// ekspor
module.exports = Router;
