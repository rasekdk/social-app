// Requires
const Joi = require("joi");

const schemaUserData = async (bodyData) => {
  const registerSchema = Joi.object({
    name: Joi.string().regex(/^\S+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).regex(/^\S+$/).required(),
    repeatPassword: Joi.valid(Joi.ref("password")).required(),
  });

  await registerSchema.validateAsync(bodyData);
};

module.exports = schemaUserData;
