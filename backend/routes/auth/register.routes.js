const express = require("express");

const registerUser = require("../../controllers/auth/register.controller");
const {validateRegister} = require("../../middleware/validators/user.validator");

const registerRouter = express.Router();

registerRouter.post("/", validateRegister, registerUser);

module.exports = registerRouter;
