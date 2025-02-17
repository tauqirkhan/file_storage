const { getAllFoldersArrayOfUser } = require("../db/queries");

const getIndexPage = async (req, res) => {
  const allFoldersByUser = await getAllFoldersArrayOfUser(req.user.id);

  res.render("index", { folders: allFoldersByUser });
};

module.exports = getIndexPage;
