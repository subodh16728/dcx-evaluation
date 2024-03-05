const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/signup", userController.userSignUp);
userRouter.post("/signin", userController.userSignin);
userRouter.get("/:id", userController.getUserById);

module.exports = userRouter;
