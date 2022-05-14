const bcrypt = require("bcrypt");

const { register } = require("../models/auth");
const { successResponse, errorResponse } = require("../helpers/response");

const auth = {};

auth.register = (req, res) => {
  // meminta body yang berisi email dan password
  const {
    body: { email, pass },
  } = req;
  bcrypt
    .hash(pass, 10)
    .then((hashedPassword) => {
      register(email, hashedPassword)
        .then(() => {
          successResponse(res, 201, { msg: "Register Success" }, null);
        })
        .catch((error) => {
          const { status, err } = error;
          errorResponse(res, status, err);
        });
    })
    .catch((err) => {
      errorResponse(res, 50, err);
    });
};

// auth.signIn = (req, res) => {};

module.exports = auth;
