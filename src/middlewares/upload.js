const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `${file.fieldname}-${suffix}${path.extname(
      file.originalname
    )}`;
    cb(null, fileName);
  },
});

const limit = {
  fileSize: 2e6, // 2 mb
};

const imageOnlyFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname);
  const allowedExt = /jpg|png/;
  if (!allowedExt.test(extName))
    return cb(new Error("Only use Allowed Extension (JPG, PNG)"), false);
  cb(null, true);
};

const imageUpload = multer({
  storage: imageStorage,
  limits: limit,
  fileFilter: imageOnlyFilter,
});

module.exports = imageUpload;
