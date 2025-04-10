const validator = require("validator");

const validateSignUpData = (req) => {
  // we can validate everything here and also in user schema for convenience i have used schema and for age here

  const { age } = req.body;

  if (age < 18) {
    throw new Error("Age should be greater than 18...");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "About",
    "Skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

// const checkPassword = (req)=>{

//   const newPassword = req.body.newPassword;

//   if (!validator.isStrongPassword(newPassword)) {
//     throw new Error(
//       "Enter a strong password (at least 1 lowercase, 1 uppercase, 1 number, and 1 special character with a minimum length of 8)"
//     );

//   }

//   return true;
// }

module.exports = {
  validateSignUpData,validateEditProfileData
};
