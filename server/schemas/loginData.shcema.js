// Requires
const Joi = require("joi");

const schemaLoginData = async (bodyData) => {
  const registerSchema = Joi.object({
    user: Joi.string().regex(/^\S+$/).required(),
    password: Joi.string().min(4).max(20).regex(/^\S+$/).required(),
  });

  await registerSchema.validateAsync(bodyData);
};

module.exports = schemaLoginData;
