const express = require("express");
const auth = require("../../middleware/auth");

const {
  AuthToken,
  LoginUser
} = require("../../controllers/auth/auth.controller");
const { validateLogin } = require("../../middleware/validators/user.validator");

const authRouter = express.Router();

authRouter.get("/", auth, AuthToken);
authRouter.post("/", validateLogin, LoginUser);

module.exports = authRouter;
