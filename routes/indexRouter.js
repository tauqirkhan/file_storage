const { Router } = require("express");
const getSignUpForm = require("../controllers/getSignUpForm");
const getLoginForm = require("../controllers/getLoginForm");
const postSignUp = require("../controllers/postSignUp");
const postFileUpload = require("../controllers/postFileUpload");
const checkAuthentication = require("../controllers/utils/checkAuthentication");
const getAllFilesFromUserFolder = require("../controllers/getAllFilesFromUserFolder");
const getIndexPage = require("../controllers/getIndexPage");
const postAddFolder = require("../controllers/postAddFolder");
const deleteFile = require("../controllers/deleteFile");

const indexRouter = Router();

indexRouter.get("/", getIndexPage);
indexRouter.get("/login", getLoginForm);
indexRouter.get("/sign-up", getSignUpForm);
indexRouter.get(
  "/:user_folder_index/folder",
  checkAuthentication,
  getAllFilesFromUserFolder
);

indexRouter.post("/sign-up", postSignUp);
indexRouter.post(
  "/:selectedFolderIndex/upload",
  checkAuthentication,
  postFileUpload
);

indexRouter.post("/add/folder", postAddFolder);

indexRouter.delete("/file/:file_id", checkAuthentication, deleteFile);

module.exports = indexRouter;
