const { Router } = require("express");
const getSignUpForm = require("../controllers/getSignUpForm");
const getLoginForm = require("../controllers/getLoginForm");
const postSignUp = require("../controllers/postSignUp");
const getUploadForm = require("../controllers/getUploadForm");
const postFileUpload = require("../controllers/postFileUpload");
const checkAuthentication = require("../controllers/utils/checkAuthentication");
const getAllFilesFromUserFolder = require("../controllers/getAllFilesFromUserFolder");

const indexRouter = Router();

indexRouter.get("/login", getLoginForm);
indexRouter.get("/sign-up", getSignUpForm);
indexRouter.get(
  "/:folder_number/folder",
  checkAuthentication,
  getAllFilesFromUserFolder
);

indexRouter.post("/sign-up", postSignUp);
indexRouter.post(
  "/:selectedFolderIndex/upload",
  checkAuthentication,
  postFileUpload
);

module.exports = indexRouter;
