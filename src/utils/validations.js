const validateSignUpData = (req) => {
  // we can validate everything here and also in user schema for convenience i have used schema and for age here

  const { age } = req.body;

  if (age < 18) {
    throw new Error("Age should be greater than 18...");
  }
};

module.exports = {
  validateSignUpData,
};
