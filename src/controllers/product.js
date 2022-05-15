const { successResponse } = require("../helpers/response");
const productModel = require("../models/product");
const {
  getProducts,
  getSingleProductFromServer,
  findProduct,
  createNewProduct,
} = productModel;

const getAllProducts = (req, res) => {
  getProducts(req.query)
    .then((result) => {
      const { totalData, totalPage, data } = result;
      const meta = {
        totalData,
        totalPage,
        route: `/product${req.route.path}?`,
        query: req.query,
        page: req.query.page,
      };
      successResponse(res, 200, data, meta);
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
