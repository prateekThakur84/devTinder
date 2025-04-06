const express= require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
      const user = req.user;
      // console.log(userData);
      res.send(user);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  
    // console.log(cookies);
    // res.send("Reading Cookies");
  });



module.exports = profileRouter;