const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../../config/db");

const createQuestion = async (req, res) => {
  let { que_name, description, creator_id, creator_name, date } = req.body;

  try {
    const getquery = "SELECT * FROM users WHERE id = ?";
    const [user] = await db.query(getquery, [req.user.id]);

    creator_id = user.id;
    creator_name = user.name;
    date = new Date();

    const insertquery =
      "INSERT INTO questions(que_name, description, creator_id, creator_name, date, updated) values (?, ?, ?, ?, ?, ?)";
    await db.query(insertquery, [
      que_name,
      description,
      creator_id,
      creator_name,
      date,
      false
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
    res.json(rows)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const GetUserQuestions = async (req, res) => {
  try {
    const getquery = "SELECT * FROM questions WHERE creator_id = ?";
    const [rows] = await db.query(getquery, [req.user.id]);
    res.json(rows)
  } catch (err) {}
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
    const updatequery = "UPDATE questions SET que_name= ?, description= ?, date = ?, updated = ? WHERE que_id = ?";
    await db.query(updatequery, [req.body.que_name, req.body.description, date, true, req.params.id]);

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

    console.log(question.creator_id, question.creator_id.toString(), req.user.id);

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


module.exports = { createQuestion, getQuestions, GetUserQuestions, GetIdQuestion, UpdateQuestion, DeleteQuestion };
