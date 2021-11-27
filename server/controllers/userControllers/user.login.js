// Hooks
const checkCorrectPassword = require("../../hooks/correctPassword.check");
const checkLoginUser = require("../../hooks/loginUser.check");
const createUserToken = require("../../hooks/userToken.create");

// Joi Schemas
const schemaLoginData = require("../../schemas/loginData.shcema");

const login = async (req, res) => {
  try {
    // Check Data
    await schemaLoginData(req.body);

    // Check User
    const userData = await checkLoginUser(req.body);

    // Check correct Password
    await checkCorrectPassword(req.body.password, userData.password);

    // Generate JWT
    const token = await createUserToken(userData, "30d");

    // Send Response
    res.send({ msg: "user loged", auth: token });
  } catch (err) {
    console.log(err);

    if (err.name === "ValidationError") err.status = 400;

    res.status(err.status || 500);
    res.send({ error: err.message });
  }
};

module.exports = login;
