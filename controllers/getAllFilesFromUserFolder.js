const { getAllFoldersArrayOfUser } = require("../db/queries");

const getAllFilesFromUserFolder = async (req, res, next) => {
  const { folder_number } = req.params;

  const selectedFolderIndex = Number(folder_number);
  //req.user property added by deserializer after authentication
  const allFoldersOfUser = await getAllFoldersArrayOfUser(req.user.id);

  let selectedFolder = [];

  const isThereFolder = allFoldersOfUser[selectedFolderIndex];

  if (isThereFolder) {
    selectedFolder = allFoldersOfUser[selectedFolderIndex];
    const folderName = selectedFolder.name;
    return res.render("file-upload", {
      folderName,
      selectedFolderIndex,
    });
  }

  //need to handle error gracefully later
  next();
};

module.exports = getAllFilesFromUserFolder;
