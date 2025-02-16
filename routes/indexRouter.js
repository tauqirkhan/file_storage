const { Router } = require("express");
const getSignUpForm = require("../controllers/getSignUpForm");
const getLoginForm = require("../controllers/getLoginForm");
const postSignUp = require("../controllers/postSignUp");
const getUploadForm = require("../controllers/getUploadForm");
const postUpload = require("../controllers/postUpload");
const checkAuthentication = require("../controllers/utils/checkAuthentication");
const getAllFilesFromUserFolder = require("../controllers/getAllFilesFromUserFolder");

const indexRouter = Router();

indexRouter.get("/login", getLoginForm);
indexRouter.get("/sign-up", getSignUpForm);
indexRouter.get("/upload", getUploadForm);
// indexRouter.get("/", getAllFoldersOfUser);
indexRouter.get(
  "/folders/:folder_number",
  checkAuthentication,
  getAllFilesFromUserFolder
);

indexRouter.post("/sign-up", postSignUp);
indexRouter.post("/upload", checkAuthentication, postUpload);

module.exports = indexRouter;
