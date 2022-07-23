const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../../config/db");

const registerUser = async (req, res) => {
  let { name, email, password } = req.body;

  try {
    const getquery = "SELECT * FROM users WHERE email = ?";
    const [user] = await db.query(getquery, [email]);

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const salt = await bcrypt.genSalt(10);

    password = await bcrypt.hash(password, salt);

    const insertquery =
      "INSERT INTO users(name,email,password) values (?, ?,?)";
    await db.query(insertquery, [name, email, password]);

    const getid = "SELECT id FROM users WHERE email = ?";
    const [id] = await db.query(getid, [email]);

    const payload = {
      user: {
        id: id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = registerUser;
