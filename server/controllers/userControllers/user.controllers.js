const register = require("./user.register");
const login = require("./user.login");
const getUsers = require("./user.getUsers");
const deleteUser = require("./user.delete");

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
};
