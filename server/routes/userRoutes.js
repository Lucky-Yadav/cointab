const express = require("express");
const { signup, signin,todoget  , todopost,tododelete} = require("../controllers/usercontroller");
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/todo", todopost);
userRouter.get("/todo", todoget);
userRouter.delete("/:id", tododelete);

module.exports = userRouter;
