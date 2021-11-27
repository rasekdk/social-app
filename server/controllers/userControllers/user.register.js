// Rquire
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Models
const UserModel = require("../../models/userModel");

// Hooks
const checkNewUser = require("../../hooks/newUser.check");
const createUserToken = require("../../hooks/userToken.create");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check New User
    await checkNewUser(req.body);

    // Crypt Password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create User
    const user = new UserModel({
      name: name,
      email: email,
      password: passwordHash,
    });

    // Save User
    await user.save();

    const token = createUserToken(user);

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
