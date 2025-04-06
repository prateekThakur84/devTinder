const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req,res,next)=>{

    try{

        const {token} = req.cookies;

        if(!token) throw new Error("Token is not valid");
        
        const decodedObj = await jwt.verify(token, "Prateek@luffy123");
        
        const {_id} = decodedObj;
        
        const user = await User.findById(_id);
        
        
        if(!user) throw new Error("User Not Found");

        req.user = user;
        
        next();
    }catch (err) {
        res.status(400).send("Eroor : "+ err.message);
      }
}

module.exports = {
    userAuth
};