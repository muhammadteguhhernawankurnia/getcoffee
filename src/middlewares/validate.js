const validate = {};

validate.queryFind = (req, res, next) => {
  // cek apakah query sesuai yg diinginkan
  const { query } = req;
  const validQuery = Object.keys(query).filter(
    (key) => key === "product" || key === "sort" || key === "order"
  );
  // diinginkan ada 3 query di atas
  if (validQuery.length < 3) {
    return res.status(400).json({
      err: "Query harus berisikan product, sort dan order",
    });
  }
  next();
};

validate.productData = (req, res, next) => {
  // cek apakah query sesuai yg diinginkan
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "product" || key === "price"
  );
  // diinginkan ada 3 query di atas
  if (validBody.length < 2) {
    return res.status(400).json({
      err: "Body harus berisikan product dan harga",
    });
  }
  // mau cek tipe data
  //   for (const key of validQuery) {
  //     if (typeof query[key] !== "string") {
  //       return res.status(400).json({
  //         err: "Invalid Query",
  //       });
  //     }
  //   }
  next();
};

module.exports = validate;
