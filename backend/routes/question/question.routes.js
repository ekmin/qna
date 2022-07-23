const express = require("express");
const auth = require("../../middleware/auth");

const {
  createQuestion,
  getQuestions,
  GetUserQuestions,
  GetIdQuestion,
  UpdateQuestion,
  DeleteQuestion
} = require("../../controllers/question/question.controller");

const quizRouter = express.Router();

quizRouter.post("/", auth, createQuestion);
quizRouter.get("/", auth, getQuestions);
quizRouter.get("/user", auth, GetUserQuestions);
quizRouter.get("/:id", auth, GetIdQuestion);
quizRouter.put("/:id", auth, UpdateQuestion);
quizRouter.delete("/:id", auth, DeleteQuestion);

module.exports = quizRouter;