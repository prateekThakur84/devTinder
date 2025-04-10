const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData, checkPassword } = require("../utils/validations");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    // console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    // console.log(loggedInUser);

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// make this patch route (/profile/password )

profileRouter.patch("/profile/password", userAuth, async(req,res)=>{
// console.log(req.user);

// if(!checkPassword(req))

} )



module.exports = profileRouter;
