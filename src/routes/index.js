const express = require("express");

const Router = express.Router();

// definisikan product router
// ./ untuk akses dalam folder yang sama
const productRouter = require("./product");

// endpoint
Router.use("/product", productRouter);

// ekspor
module.exports = Router;
