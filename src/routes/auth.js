const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");

const { validateSignUpData } = require("../utils/validations");

authRouter.post("/signup", async (req, res) => {
  console.log(req.body);

  try {
    // validation of the data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    // const userObj = {
    //   firstName: "Akshay",
    //   lastName: "Sharma",
    //   emailId: "prateek08thakur@gmail.com",
    //   password: "12345",
    // };

    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("✅ User Added:", newUser);

    res.status(201).json({ message: "✅ User Added", user: newUser });
  } catch (err) {
    // console.error("❌ Error:", err.message);
    // res.status(500).json({ error: err.message });
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {
      // create a JSOB web token
      const token = await user.getJWT();
      console.log(token);
      //hello

      // add token to cookie and send the responsse back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successfully");
    } else throw new Error("Invalid Credentials");
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});



module.exports = authRouter;
