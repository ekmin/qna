const express = require("express");

require("dotenv").config();

const registerRouter = require("./routes/auth/register.routes");
const authRouter = require("./routes/auth/auth.routes");
const questionRouter = require("./routes/question/question.routes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/question", questionRouter)

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
