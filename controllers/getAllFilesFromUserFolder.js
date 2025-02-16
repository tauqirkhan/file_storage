const { getAllFoldersArrayOfUser } = require("../db/queries");

const getAllFilesFromUserFolder = async (req, res, next) => {
  const { folder_number } = req.params;

  //Array starts with 0
  const integerFolderNumber = Number(folder_number) - 1;
  //req.user property added by deserializer after authentication
  const getAllFoldersOfUser = await getAllFoldersArrayOfUser(req.user.id);

  let selectedFolder = [];

  const isThereFolder = getAllFoldersOfUser[integerFolderNumber];

  if (isThereFolder) {
    selectedFolder = getAllFoldersOfUser[integerFolderNumber];
    return res.send(selectedFolder.name);
  }

  //need to handle error gracefully later
  next();
};

module.exports = getAllFilesFromUserFolder;
