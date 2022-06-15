// const { response } = require("express");
const db = require("../config/db");
// const imageUpload = require("../middlewares/upload")
// const multer = require("multer")
// const path = require("path");
// const { resolve } = require("path");

const createNewUser = (body) => {
  return new Promise((resolve, reject) => {
    const { username, email, pass, phone, date, address, gender, picture } =
      body;
    const sqlQuery =
      "INSERT INTO (username, email, password, phone, date, address, gender, pictures) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING username, email, phone";
    db.query(sqlQuery, [
      username,
      email,
      pass,
      phone,
      date,
      address,
      gender,
      picture,
    ])
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
  createNewUser,
};
