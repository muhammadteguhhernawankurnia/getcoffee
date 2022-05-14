// const { response } = require("express");
const db = require("../config/db");

const getProductFromServer = () => {
  return new Promise((resolve, reject) => {
    // let err = false;
    // if (err)
    //   return reject({
    //     err: new Error(err),
    //     status: 500,
    //   });
    // return resolve(products);
    db.query("SELECT * FROM products")
      .then((result) => {
        const response = {
          total: result.rowCount,
          data: result.rows,
        };
        resolve(response);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const getSingleProductFromServer = (id) => {
  return new Promise((resolve, reject) => {
    // parameterized query
    const sqlQuery = "SELECT * FROM products WHERE id = $1";
    db.query(sqlQuery, [id])
      .then((data) => {
        if (data.rows.length === 0) {
          return reject({ status: 404, err: "Product Not Found" });
        }
        const response = {
          data: data.rows,
        };
        resolve(response);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const findProduct = (query) => {
  return new Promise((resolve, reject) => {
    // asumsikan query berisi product, order, sort
    const { product, order, sort } = query;
    let sqlQuery =
      "select * from products where lower (product) like lower ('%' || $1 || '%')";
    if (order) {
      sqlQuery += " order by " + sort + " " + order;
    }
    db.query(sqlQuery, [product])
      .then((result) => {
        if (result.rows.length === 0) {
          return reject({ status: 404, err: "Product Not Found" });
        }
        const response = {
          total: result.rowCount,
          data: result.rows,
        };
        resolve(response);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const createNewProduct = (body) => {
  return new Promise((resolve, reject) => {
    const { product, price } = body;
    const sqlQuery =
      "INSERT INTO products(product, price) VALUES ($1, $2) RETURNING *";
    db.query(sqlQuery, [product, price])
      .then(({ rows }) => {
        const response = {
          data: rows[0],
        };
        resolve(response);
      })
      .catch((err) => reject({ status: 500, err }));
  });
};

module.exports = {
  getProductFromServer,
  getSingleProductFromServer,
  findProduct,
  createNewProduct,
};
