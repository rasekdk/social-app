const jwt = require("jsonwebtoken");

const createUserToken = (userData, expires = "30d") => {
  const tokenPayload = {
    id: userData._id,
    name: userData.name,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: expires,
  });

  return token;
};

module.exports = createUserToken;
