const { password } = require("pg/lib/defaults");
const userModel = require("../models/user");
const { createNewUser } = userModel;

const postNewUser = (req, res) => {
  createNewUser(req.body)
    .bcrypt.hash(password, 10)
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
  postNewUser,
};
