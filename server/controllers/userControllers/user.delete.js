// Require
const jwt = require("jsonwebtoken");

// Model
const UserModel = require("../../models/userModel");

// Hooks
const checkLoginUser = require("../../hooks/loginUser.check");

// Joi Schemas
const schemaEditUserData = require("../../schemas/editUserData.schema");
const checkCorrectPassword = require("../../hooks/correctPassword.check");
const checkUserById = require("../../hooks/userId.check");

const deleteUser = async (req, res) => {
  try {
    const { auth, password, repeatPassword } = req.body;

    // Check Data
    await schemaEditUserData(req.body);

    // Decode token
    const decode = jwt.decode(auth);

    // Check user
    const user = await checkUserById(decode.id);

    await checkCorrectPassword(password, user.password);

    // Delete user
    await UserModel.deleteOne({ _id: decode.id });

    // Response
    res.send({ msg: "user deleted" });
  } catch (err) {
    console.log(err);

    if (err.name === "ValidationError") err.status = 400;

    res.status(err.status || 500);
    res.send({ error: err.message });
  }
};

module.exports = deleteUser;
