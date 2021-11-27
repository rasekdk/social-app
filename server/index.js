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

const { userController } = require("./controllers/controllers");

app.post("/user/register", userController.register);

app.post("/user/login", userController.login);

app.delete("/user/delete", userController.deleteUser);

app.get("/users", userController.getUsers);

app.listen(3001, () => console.log("Server runnign on port 3001"));
