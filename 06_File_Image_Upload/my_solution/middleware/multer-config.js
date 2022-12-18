// const multer = require("multer");

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, "_" + Date.now() + "_" + file.originalname);
//   },
// });

// module.exports = multer({ fileFilter, storage: fileStorage }).single("image");

//-------------------------------------------------------------------------------

const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (req.body.event === "avatars") {
      callback(null, "avatars");
    } else if (req.body.event === "backgrounds") {
      callback(null, "backgrounds");
    } else {
      callback(null, "images");
    }
  },

  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".").slice(0, -1);
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

module.exports = multer({ filter, storage }).single("image");
