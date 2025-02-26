const multer = require("multer");
const path = require("node:path");
const {
  insertFileInsideFolder,
  getAllFoldersArrayOfUser,
} = require("../db/queries");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "private", "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      //to get file extension
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

//10 MB max
const limits = { fileSize: 10 * 1024 * 1024 };

const upload = multer({ storage: storage, limits: limits });

const postFileUpload = [
  upload.single("uploadFile"),
  async (req, res) => {
    const { selectedFolderIndex } = req.params;

    const allFoldersArrayOfUser = await getAllFoldersArrayOfUser(req.user.id);
    const selectedFolder = allFoldersArrayOfUser[selectedFolderIndex];
    const folderId = selectedFolder.id;
    //add file type to file object
    req.file.fileType = path.extname(req.file.filename);
    const fileObject = req.file;
    const insertFile = await insertFileInsideFolder(folderId, fileObject);

    res.redirect(`/${selectedFolderIndex}/folder`);
  },
];

module.exports = postFileUpload;
