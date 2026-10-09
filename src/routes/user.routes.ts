import express from "express"
import {createUser,loginUser,viewUser} from "../controllers/user.controller.js"
const userRouter=express.Router()

userRouter.post("/create",createUser)
userRouter.post("/login", loginUser)
userRouter.get("/view",viewUser)

export default userRouter;