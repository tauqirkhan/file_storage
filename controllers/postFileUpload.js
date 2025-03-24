const multer = require("multer");
const path = require("node:path");
const {
  insertFileInsideFolder,
  getAllFoldersArrayOfUser,
} = require("../db/queries");

const storage = multer.memoryStorage();

//10 MB max
const limits = { fileSize: 10 * 1024 * 1024 };

const upload = multer({ storage: storage, limits: limits });

const postFileUpload = [
  upload.single("uploadFile"),
  async (req, res) => {
    //authentication already check
    const user_id = req.user.id;

    const fileObject = req.file;

    if (!fileObject)
      return res.status(400).json({ message: "Please upload a file" });

    const { selectedFolderIndex } = req.params;

    const allFoldersArrayOfUser = await getAllFoldersArrayOfUser(user_id);
    const selectedFolder = allFoldersArrayOfUser[selectedFolderIndex];
    const folderId = selectedFolder.id;
    //add file type to file object
    req.file.fileType = path.extname(req.file.filename);
    const insertFile = await insertFileInsideFolder(folderId, fileObject);

    res.redirect(`/${selectedFolderIndex}/folder`);
  },
];

module.exports = postFileUpload;
