const getUploadForm = async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("file-upload");
  } else {
    res.send("You must be authenticated");
  }
};

module.exports = getUploadForm;
