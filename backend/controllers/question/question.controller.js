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
      "INSERT INTO questions(que_name, description, creator_id, creator_name, date) values (?, ?, ?, ?, ?)";
    await db.query(insertquery, [
      que_name,
      description,
      creator_id,
      creator_name,
      date
    ]);

    res.status(201).json({ msg: "Question created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { createQuestion };
