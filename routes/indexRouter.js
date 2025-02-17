const { Router } = require("express");
const getSignUpForm = require("../controllers/getSignUpForm");
const getLoginForm = require("../controllers/getLoginForm");
const postSignUp = require("../controllers/postSignUp");
const postFileUpload = require("../controllers/postFileUpload");
const checkAuthentication = require("../controllers/utils/checkAuthentication");
const getAllFilesFromUserFolder = require("../controllers/getAllFilesFromUserFolder");
const getIndexPage = require("../controllers/getIndexPage");
const postAddFolder = require("../controllers/postAddFolder");

const indexRouter = Router();

indexRouter.get("/", checkAuthentication, getIndexPage);
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
indexRouter.post("/add/folder", postAddFolder);

module.exports = indexRouter;
