// const { Router } = require("express");

const productModel = require("../models/product");
const { getProductFromServer, getSingleProductFromServer } = productModel;

const getAllProducts = (_, res) => {
  getProductFromServer()
    .then((result) => {
      const { total, data } = result;
      res.status(200).json({
        data,
        total,
        err: null,
      });
    })
    .catch((error) => {
      const { err, status } = error;
      res.status(status).json({
        err,
        data: [],
      });
    });
};

const getProductById = (_, res) => {
  getSingleProductFromServer(1)
    .then((result) => {
      res.status(200).json({
        data: result,
        err: null,
      });
    })
    .catch((error) => {
      const { err, status } = error;
      res.status(status).json({
        data: [],
        err: err.message,
      });
    });
};

module.exports = {
  getAllProducts,
  getProductById,
};
