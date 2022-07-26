const express = require("express");

const auth = require("../../middleware/auth");
const {validateQuestion, validateComment} = require("../../middleware/validators/question.validator");
const {
  createQuestion,
  getQuestions,
  GetUserQuestions,
  GetIdQuestion,
  UpdateQuestion,
  DeleteQuestion,
  AddComment,
  GetIdComment,
  GetUserComments,
  GetQueComments,
  UpdateComment,
  DeleteComment,
} = require("../../controllers/question/question.controller");

const quizRouter = express.Router();

quizRouter.post("/", [auth, validateQuestion], createQuestion);
quizRouter.get("/", getQuestions);
quizRouter.get("/user", auth, GetUserQuestions);
quizRouter.get("/one/:id", GetIdQuestion);
quizRouter.put("/one/:id", auth, UpdateQuestion);
quizRouter.delete("/one/:id", auth, DeleteQuestion);
quizRouter.post("/comment/one/:id", [auth, validateComment], AddComment);
quizRouter.get("/comment/one/:id", auth, GetIdComment);
quizRouter.get("/comment/", auth, GetUserComments);
quizRouter.get("/comment/que/:id", GetQueComments);
quizRouter.put("/comment/one/:id", [auth, validateComment], UpdateComment);
quizRouter.delete("/comment/one/:id", auth, DeleteComment);

module.exports = quizRouter;
