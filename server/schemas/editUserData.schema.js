// Requires
const Joi = require("joi");

const schemaEditUserData = async (bodyData) => {
  const registerSchema = Joi.object({
    auth: Joi.string().min(4).regex(/^\S+$/).required(),
    password: Joi.string().min(4).max(20).regex(/^\S+$/).required(),
    repeatPassword: Joi.valid(Joi.ref("password")).required(),
  });

  await registerSchema.validateAsync(bodyData);
};

module.exports = schemaEditUserData;
