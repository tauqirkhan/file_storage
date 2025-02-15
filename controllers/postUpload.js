const multer = require("multer");
const path = require("node:path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "private", "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random * 1e9) +
      //to get file extension
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const postUpload = [
  upload.single("uploadFile"),
  async (req, res) => {
    console.log(req.file, req.body);
    res.redirect("upload");
  },
];

module.exports = postUpload;
