const { deleteFileByFileID, checkFileOwnerShip } = require("../db/queries");

const deleteFile = async (req, res) => {
  const { file_id } = req.params;

  //check if user have file ownership
  const isUsersFile = await checkFileOwnerShip(
    Number(req.user.id),
    Number(file_id)
  );

  // 401 error: non authorization
  if (!isUsersFile) return res.status(401).send("User not authorize");

  //need to explicitly send number type
  await deleteFileByFileID(Number(file_id));

  return res.redirect("/");
};

module.exports = deleteFile;
