const { getAllFoldersArrayOfUser } = require("../db/queries");

const getAllFilesFromUserFolder = async (req, res, next) => {
  const { user_folder_index } = req.params;

  const selectedFolderIndex = Number(user_folder_index);
  //req.user property added by deserializer after authentication
  const allFoldersOfUser = await getAllFoldersArrayOfUser(req.user.id);

  const isThereFolder = allFoldersOfUser[selectedFolderIndex];

  if (isThereFolder) {
    //setting new session.selectedFolderIndex if not there and changing if previous one is not same as current
    if (req.session.selectedFolderIndex) {
      if (req.session.selectedFolderIndex != selectedFolderIndex)
        req.session.selectedFolderIndex = selectedFolderIndex;
    } else {
      req.session.selectedFolderIndex = selectedFolderIndex;
    }

    return res.redirect("/");
  } else {
    console.log("something went wrong on getAllFilesFromUserFolder");
    return res.status(500).redirect("/err");
  }

  //need to handle error gracefully later
  next();
};

module.exports = getAllFilesFromUserFolder;
