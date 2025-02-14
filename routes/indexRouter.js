const { Router } = require("express");
const getSignUpForm = require("../controllers/getSignUpForm");
const getLoginForm = require("../controllers/getLoginForm");
const postSignUp = require("../controllers/postSignUp");
const getUploadForm = require("../controllers/getUploadForm");
const postUpload = require("../controllers/postUpload");

const indexRouter = Router();

indexRouter.get("/", getLoginForm);
indexRouter.get("/sign-up", getSignUpForm);
indexRouter.get("/upload", getUploadForm);

indexRouter.post("/sign-up", postSignUp);
indexRouter.post("/upload", postUpload);

module.exports = indexRouter;
