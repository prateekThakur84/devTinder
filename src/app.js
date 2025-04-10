const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);



// 🔹 Connect DB and start server
connectDB().then(() => {
  console.log("✅ DB Connected");
  app.listen(3000, () => console.log("🚀 Server running on port 3000"));
});
