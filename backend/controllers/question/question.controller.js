const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../../config/db");

const createQuestion = async (req, res) => {
  let { que_name, description } = req.body;

  try {
    const getquery = "SELECT * FROM users WHERE id = ?";
    const [user] = await db.query(getquery, [req.user.id]);

    let creator_id = user.id;
    let creator_name = user.name;
    let date = new Date();

    const insertquery =
      "INSERT INTO questions(que_name, description, creator_id, creator_name, date, edited) values (?, ?, ?, ?, ?, ?)";
    await db.query(insertquery, [
      que_name,
      description,
      creator_id,
      creator_name,
      date,
      false,
    ]);

    res.status(201).json({ msg: "Question created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getQuestions = async (req, res) => {
  try {
    const getquery = "SELECT * FROM questions";
    const [rows] = await db.query(getquery);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const GetUserQuestions = async (req, res) => {
  try {
    const getquery = "SELECT * FROM questions WHERE creator_id = ?";
    const [rows] = await db.query(getquery, [req.user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

const GetIdQuestion = async ({ params: { id } }, res) => {
  try {
    const getquery = "SELECT * FROM questions WHERE que_id = ?";
    const [question] = await db.query(getquery, [id]);

    if (!question) return res.status(400).json({ msg: "Question not found" });

    return res.json(question);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

const UpdateQuestion = async (req, res) => {
  try {
    date = new Date();
    const updatequery =
      "UPDATE questions SET que_name= ?, description= ?, date = ?, edited = ? WHERE que_id = ?";
    await db.query(updatequery, [
      req.body.que_name,
      req.body.description,
      date,
      true,
      req.params.id,
    ]);

    const getquery = "SELECT * FROM questions WHERE que_id = ?";
    const [question] = await db.query(getquery, [req.params.id]);

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const DeleteQuestion = async (req, res) => {
  try {
    const getquery = "SELECT * FROM questions WHERE que_id = ?";
    const [question] = await db.query(getquery, [req.params.id]);

    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }

    if (question.creator_id !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const deletequery = "DELETE FROM questions WHERE que_id = ?";
    await db.query(deletequery, [req.params.id]);

    res.json({ msg: "Question removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const AddComment = async (req, res) => {
  let { text } = req.body;

  try {
    const getuserquery = "SELECT * FROM users WHERE id = ?";
    const [user] = await db.query(getuserquery, [req.user.id]);

    const getquequery = "SELECT * FROM questions WHERE que_id = ?";
    const [question] = await db.query(getquequery, [req.params.id]);

    let que_id = question.que_id;
    let creator_id = user.id;
    let creator_name = user.name;
    let date = new Date();

    const insertquery =
      "INSERT INTO comments(text, que_id, creator_id, creator_name, date, edited) values (?, ?, ?, ?, ?, ?)";
    await db.query(insertquery, [
      text,
      que_id,
      creator_id,
      creator_name,
      date,
      false,
    ]);

    res.status(201).json({ msg: "Comment created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const GetIdComment = async (req, res) => {
  try {
    const getquery = "SELECT * FROM comments WHERE com_id = ?";
    const [comments] = await db.query(getquery, [req.params.id]);

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

const GetUserComments = async (req, res) => {
  try {
    const getquery = "SELECT * FROM comments WHERE creator_id = ?";
    const [rows] = await db.query(getquery, [req.user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

const GetQueComments = async (req, res) => {
  try {
    const getquery = "SELECT * FROM comments WHERE que_id = ?";
    const [comments] = await db.query(getquery, [req.params.id]);

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

const UpdateComment = async (req, res) => {
  try {
    date = new Date();
    const updatequery =
      "UPDATE comments SET text= ?, date = ?, edited = ? WHERE com_id = ?";
    await db.query(updatequery, [req.body.text, date, true, req.params.id]);

    const getquery = "SELECT * FROM comments WHERE com_id = ?";
    const [comments] = await db.query(getquery, [req.params.id]);

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const DeleteComment = async (req, res) => {
  try {
    const getquery = "SELECT * FROM comments WHERE com_id = ?";
    const [comment] = await db.query(getquery, [req.params.id]);

    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    if (comment.creator_id !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const deletequery = "DELETE FROM comments WHERE com_id = ?";
    await db.query(deletequery, [req.params.id]);

    return res.json({ msg: "Comment removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
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
};
