const { getAllFoldersArrayOfUser } = require("../db/queries");

const getIndexPage = async (req, res) => {
  let allFoldersByUser = null;

  //check if req.user is there to avoid error cause by req.user.id
  if (req.user) allFoldersByUser = await getAllFoldersArrayOfUser(req.user.id);

  //if req.session & req.session.selectedFolderIndex is not there setting it to null
  if (!req.session && !req.session.selectedFolderIndex)
    req.session.selectedFolderIndex = null;

  const isAuthenticated = req.isAuthenticated();

  res.render("index", {
    folders: allFoldersByUser,
    selectedFolderIndex: req.session.selectedFolderIndex,
    isAuthenticated,
  });
};

module.exports = getIndexPage;
