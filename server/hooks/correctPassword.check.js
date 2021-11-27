// Require
const bcrypt = require("bcryptjs");

const checkCorrectPassword = async (bodyPassword, userPassword) => {
  const correctPassword = await bcrypt.compare(bodyPassword, userPassword);

  if (!correctPassword) {
    const err = "wrong password";
    const error = new Error(err);
    error.status = 401;

    throw error;
  }
};

module.exports = checkCorrectPassword;
