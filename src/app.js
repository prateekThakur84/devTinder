const express = require("express");
const dotenv = require("dotenv");
const User = require("./model/user");
const connectDB = require("./config/database");

dotenv.config();

const app = express();
app.use(express.json());

// 🔹 Define signup route
app.post("/signup", async (req, res) => {
  console.log(req.body);

  try {
    // const userObj = {
    //   firstName: "Akshay",
    //   lastName: "Sharma",
    //   emailId: "prateek08thakur@gmail.com",
    //   password: "12345",
    // };

    const newUser = new User(req.body);
    await newUser.save();
    console.log("✅ User Added:", newUser);

    res.status(201).json({ message: "✅ User Added", user: newUser });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// get user by email

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if(!user){
        res.status(404).send("user not fonud");
    }else{
        res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
// Feed API - GET /feed - get all the user from the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users); 
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    }catch (err) {
        res.status(400).send("Something went wrong");
      }
})

// api to update data of the user
app.patch("/user/:userId", async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;


    try{
        const ALLOWED_UPDATES=["photoUrl","About","gender","age","Skills"];
        const isUpdatedAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));

        if(!isUpdatedAllowed){
          throw new Error("Updated not allowed");
        }

        if(data?.skills.length > 10){
          throw new Error("Skills can not be greater than 10");
        }

        await User.findByIdAndUpdate({_id: userId}, data,{
          returnDocument: "after",
          runValidators: true,
        });
        res.send("user updated successfully");

    } catch (err) {
    res.status(400).send("Update failed: "+err.message);
  }
})

// 🔹 Connect DB and start server
connectDB().then(() => {
  console.log("✅ DB Connected");
  app.listen(3000, () => console.log("🚀 Server running on port 3000"));
});
