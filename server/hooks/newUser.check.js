const Joi = require("joi");
const UserModel = require("../models/userModel");

const checkNewUser = async (user) => {
  // Check Data
  const registerSchema = Joi.object({
    name: Joi.string().regex(/^\S+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).regex(/^\S+$/).required(),
    repeatPassword: Joi.valid(Joi.ref("password")).required(),
  });

  await registerSchema.validateAsync(user);

  // Check Unique
  const [userName] = await UserModel.find({ name: user.name });
  const [userEmail] = await UserModel.find({ email: user.email });

  if (userName) {
    const err = "used name";
    const error = new Error(err);
    error.status = 409;

    throw error;
  }

  if (userEmail) {
    const err = "used email";
    const error = new Error(err);
    error.status = 409;

    throw error;
  }
};

module.exports = checkNewUser;
