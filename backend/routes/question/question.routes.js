const express = require("express");
const auth = require("../../middleware/auth");

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

quizRouter.post("/", auth, createQuestion);
quizRouter.get("/", auth, getQuestions);
quizRouter.get("/user", auth, GetUserQuestions);
quizRouter.get("/:id", auth, GetIdQuestion);
quizRouter.put("/:id", auth, UpdateQuestion);
quizRouter.delete("/:id", auth, DeleteQuestion);
quizRouter.post("/comment/:id", auth, AddComment);
quizRouter.get("/comment/one/:id", auth, GetIdComment);
quizRouter.get("/comment/", auth, GetUserComments);
quizRouter.get("/comment/:id", auth, GetQueComments);
quizRouter.put("/comment/:id", auth, UpdateComment);
quizRouter.delete("/comment/:id", auth, DeleteComment);

module.exports = quizRouter;
