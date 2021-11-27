// Models
const UserModel = require("../../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.send(users);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getUsers;
