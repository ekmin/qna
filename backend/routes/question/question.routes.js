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
quizRouter.get("/:id", GetIdQuestion);
quizRouter.put("/:id", auth, UpdateQuestion);
quizRouter.delete("/:id", auth, DeleteQuestion);
quizRouter.post("/comment/:id", [auth, validateComment], AddComment);
quizRouter.get("/comment/one/:id", auth, GetIdComment);
quizRouter.get("/comment/", auth, GetUserComments);
quizRouter.get("/comment/:id", GetQueComments);
quizRouter.put("/comment/:id", [auth, validateComment], UpdateComment);
quizRouter.delete("/comment/:id", auth, DeleteComment);

module.exports = quizRouter;
