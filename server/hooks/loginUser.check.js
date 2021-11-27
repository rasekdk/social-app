// Models
const UserModal = require("../models/userModel");

// Hooks
const checkCorrectPassword = require("./correctPassword.check");
const createUserToken = require("./userToken.create");

const checkLoginUser = async (bodyData) => {
  const [userData] = await UserModal.find({
    $or: [{ name: bodyData.user }, { email: bodyData.user }],
  });

  if (!userData) {
    const err = "not found user";
    const error = new Error(err);
    error.status = 404;

    throw error;
  }

  return userData;
};

module.exports = checkLoginUser;
