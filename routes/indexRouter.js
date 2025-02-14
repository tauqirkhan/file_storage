const { Router } = require("express");
const getSignUpForm = require("../controllers/getSignUpForm");
const getLoginForm = require("../controllers/getLoginForm");
const postSignUp = require("../controllers/postSignUp");

const indexRouter = Router();

indexRouter.get("/sign-up", getSignUpForm);
indexRouter.get("/", getLoginForm);

indexRouter.post("/sign-up", postSignUp);

module.exports = indexRouter;
