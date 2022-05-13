const db = require("../config/db");
const products = [
  {
    id: 1,
    product: "Veggle Tomato Mix",
    price: 34000,
  },
  {
    id: 2,
    product: "Hazelnut Latte",
    price: 25000,
  },
  {
    id: 3,
    product: "Summer Fried Rice",
    price: 32000,
  },
];

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
    let err = false;
    const product = products.filter((product) => product.id === id);
    if (err)
      return reject({
        err: new Error(err),
        status: 500,
      });
    if (product.length === 0)
      return reject({
        err: new Error("Product Not Found"),
        status: 404,
      });
    return resolve(product);
  });
};

module.exports = {
  getProductFromServer,
  getSingleProductFromServer,
};
