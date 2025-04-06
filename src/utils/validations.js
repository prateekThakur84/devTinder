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


module.exports = {
  validateSignUpData,validateEditProfileData
};
