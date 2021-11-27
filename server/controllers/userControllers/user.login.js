const checkCorrectPassword = require("../../hooks/correctPassword.check");
const checkLoginUser = require("../../hooks/loginUser.check");
const createUserToken = require("../../hooks/userToken.create");

const login = async (req, res) => {
  try {
    // Check Request Data
    const userData = await checkLoginUser(req.body);

    // Check correct Password
    await checkCorrectPassword(req.body, userData);

    // Generate JWT
    const token = await createUserToken(userData, "30d");

    // Send Response
    res.send({ auth: token });
  } catch (err) {
    console.log(err);

    if (err.name === "ValidationError") err.status = 400;

    res.status(err.status || 500);
    res.send({ error: err.message });
  }
};

module.exports = login;
