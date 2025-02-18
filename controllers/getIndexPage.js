const { getAllFoldersArrayOfUser } = require("../db/queries");

const getIndexPage = async (req, res) => {
  const allFoldersByUser = await getAllFoldersArrayOfUser(req.user.id);

  //if req.session & req.session.selectedFolderIndex is not there setting it to null
  if (!req.session && !req.session.selectedFolderIndex)
    req.session.selectedFolderIndex = null;

  res.render("index", {
    folders: allFoldersByUser,
    selectedFolderIndex: req.session.selectedFolderIndex,
  });
};

module.exports = getIndexPage;
