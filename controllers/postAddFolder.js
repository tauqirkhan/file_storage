const { insertFolderByUser } = require("../db/queries");

const postAddFolder = async (req, res) => {
  const { folderName } = req.body;

  const result = await insertFolderByUser(req.user.id, folderName);

  res.redirect("/");
};

module.exports = postAddFolder;
