const Joi = require("joi");

const UserModal = require("../models/userModel");
const checkCorrectPassword = require("./correctPassword.check");
const createUserToken = require("./userToken.create");

const checkLoginUser = async (bodyData) => {
  // Check Data
  const registerSchema = Joi.object({
    user: Joi.string().regex(/^\S+$/).required(),
    password: Joi.string().min(4).max(20).regex(/^\S+$/).required(),
  });

  await registerSchema.validateAsync(bodyData);

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
