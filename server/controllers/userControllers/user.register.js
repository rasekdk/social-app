// Rquire
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Models
const UserModel = require("../../models/userModel");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check Data
    const registerSchema = Joi.object({
      name: Joi.string().regex(/^\S+$/).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(20).regex(/^\S+$/).required(),
      repeatPassword: Joi.valid(Joi.ref("password")).required(),
    });

    await registerSchema.validateAsync(req.body);

    // Check Unique
    const [userName] = await UserModel.find({ name: name });
    const [userEmail] = await UserModel.find({ email: email });

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

    // Crypt Password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create User
    const user = new UserModel({
      name: name,
      email: email,
      password: passwordHash,
    });

    // Save User
    const newUser = await user.save();

    // Generate JWT
    const tokenPayload = {
      id: newUser._id,
      name: newUser.name,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Response
    res.send({ auth: token });
  } catch (err) {
    console.log(err);

    if (err.name === "ValidationError") err.status = 400;

    res.status(err.status || 500);
    res.send({ error: err.message });
  }
};

module.exports = register;
