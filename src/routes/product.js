// penulisan impor lainnya
const Router = require("express").Router();

const productController = require("../controllers/product");

// daftar HTTP request method
// definisikan endpoint
// path /product diganti / saja karena sudah auto masuk endpoint product
// server diganti router
Router.get("/all", productController.getAllProducts);
Router.get("/1", productController.getProductById);

Router.get("/", (req, res) => {
  res.json({
    msg: "show menu",
  });
});

Router.post("/", (req, res) => {
  res.json({
    msg: "posting product",
  });
});

Router.patch("/", (req, res) => {
  res.json({
    msg: "updated product",
  });
});

Router.delete("/", (req, res) => {
  res.json({
    msg: "deleted product",
  });
});

// ekspor
module.exports = Router;
