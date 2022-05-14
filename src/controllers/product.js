// const { Router } = require("express");

const productModel = require("../models/product");
const {
  getProductFromServer,
  getSingleProductFromServer,
  findProduct,
  createNewProduct,
} = productModel;

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

// di dalam object request,
// kita bisa mengirimkan input diantaranya melalui:
// 1. path params => req.params
// ex: host/product/:id
// 2. query params => req.query
// ex: localhost/product?product=Tomato
// 3. body = req.body
// form url encoded dan raw json dll

const getProductById = (req, res) => {
  const id = req.params.id;
  getSingleProductFromServer(id)
    .then(({ data }) => {
      // const { data } = result;
      res.status(200).json({
        data,
        err: null,
      });
    })
    .catch((error) => {
      const { err, status } = error;
      res.status(status).json({
        data: [],
        err,
      });
    });
};

const findProductByQuery = (req, res) => {
  findProduct(req.query)
    .then(({ data, total }) => {
      res.status(200).json({
        err: null,
        data,
        total,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({
        data: [],
        err,
      });
    });
};

const postNewProduct = (req, res) => {
  createNewProduct(req.body)
    .then(({ data }) => {
      res.status(200).json({
        err: null,
        data,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({
        err,
        data: [],
      });
    });
};

module.exports = {
  getAllProducts,
  getProductById,
  findProductByQuery,
  postNewProduct,
};
