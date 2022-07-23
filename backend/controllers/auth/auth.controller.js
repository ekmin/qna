const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../../config/db");

const AuthToken = async (req, res) => {
  try {
    const getquery = "SELECT * FROM users WHERE id = ?";
    const [user] = await db.query(getquery, [req.user.id]);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const getquery = "SELECT * FROM users WHERE email = ?";
    const [user] = await db.query(getquery, [email]);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
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
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  AuthToken,
  LoginUser
};
