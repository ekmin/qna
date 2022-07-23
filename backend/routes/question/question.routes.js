const express = require("express");
const auth = require("../../middleware/auth");

const {
  createQuestion
} = require("../../controllers/question/question.controller");

const quizRouter = express.Router();

quizRouter.post("/", auth, createQuestion);

module.exports = quizRouter;