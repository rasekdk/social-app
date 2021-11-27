// Model
const UserModel = require("../models/userModel");

const checkUserById = async (userId) => {
  const [user] = await UserModel.find({ _id: userId });

  if (!user) {
    const err = "user not foud";
    const error = new Error(err);
    error.status = 404;

    throw error;
  }

  return user;
};

module.exports = checkUserById;
