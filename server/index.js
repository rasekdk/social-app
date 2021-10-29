require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGODB_HOST } = process.env;

const app = express();

const UserModel = require("./models/userModel");

app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB_HOST, {
  useNewUrlParser: true,
});

app.post("/user/register", async (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userAvatar = req.body.avatar;

  const user = new UserModel({
    name: userName,
    email: userEmail,
    password: userPassword,
    avatar: userAvatar,
  });

  try {
    await user.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.listen(3001, () => console.log("Server runnign on port 3001"));
