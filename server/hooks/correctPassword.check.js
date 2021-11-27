const bcrypt = require("bcryptjs");

const checkCorrectPassword = async (bodyData, userData) => {
  const correctPassword = await bcrypt.compare(
    bodyData.password,
    userData.password
  );

  if (!correctPassword) {
    const err = "wrong password";
    const error = new Error(err);
    error.status = 401;

    throw error;
  }
};

module.exports = checkCorrectPassword;
