// Requires
const Joi = require("joi");

// Models
const UserModel = require("../models/userModel");

const checkNewUser = async (user) => {
  // Check Unique
  const [userName] = await UserModel.find({ name: user.name });

  if (userName) {
    const err = "used name";
    const error = new Error(err);
    error.status = 409;

    throw error;
  }

  const [userEmail] = await UserModel.find({ email: user.email });

  if (userEmail) {
    const err = "used email";
    const error = new Error(err);
    error.status = 409;

    throw error;
  }
};

module.exports = checkNewUser;
