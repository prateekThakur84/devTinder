const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 25,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email Address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Enter a strong password (atleast 1 lowercase, 1 uppercase ,1 number and 1 special character with total of 8 length " +
              value
          );
        }
      },
    },
    age: {
      type: String,
      // min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1743669109~exp=1743672709~hmac=d051f1c687df004050d36743a4dfb2f85ed82a831f266d4d1b404272d583f7dd&w=740",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL : " + value);
        }
      },
    },
    About: {
      type: String,
      default: "this is default value for about section",
    },
    Skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "Prateek@luffy123", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
