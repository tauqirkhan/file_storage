const multer = require("multer");
const path = require("node:path");
const {
  insertFileInsideFolder,
  getAllFoldersArrayOfUser,
} = require("../db/queries");

const supabase = require("./utils/supabase");
const { decode } = require("base64-arraybuffer");

const storage = multer.memoryStorage();

//10 MB max
const limits = { fileSize: 10 * 1024 * 1024 };

const upload = multer({ storage: storage, limits: limits });

const postFileUpload = [
  upload.single("uploadFile"),
  async (req, res) => {
    try {
      //authentication already check
      const user_id = req.user.id;

      const file = req.file;

      if (!file)
        return res.status(400).json({ message: "Please upload a file" });

      // decode file buffer to base64
      const fileBase64 = decode(file.buffer.toString("base64"));

      //upload the file to supabase

      const { data, error } = await supabase.storage
        .from("file-storage-app")
        .upload(file.originalname, fileBase64, {
          contentType: "image/png",
        });

      if (error) throw error;

      // get public url of the uploaded file
      const { data: image } = supabase.storage
        .from("file-storage-app")
        .getPublicUrl(data.path);

      //add path to file object
      file.path = String(image.publicUrl);

      const { selectedFolderIndex } = req.params;

      const allFoldersArrayOfUser = await getAllFoldersArrayOfUser(user_id);
      const selectedFolder = allFoldersArrayOfUser[selectedFolderIndex];
      const folderId = selectedFolder.id;
      //add file type to file object
      req.file.fileType = path.extname(file.originalname);
      const insertFile = await insertFileInsideFolder(folderId, file);

      res.redirect(`/${selectedFolderIndex}/folder`);
    } catch (err) {
      console.error("Server Error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

module.exports = postFileUpload;
