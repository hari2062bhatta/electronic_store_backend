import express from "express"
import {createUser,loginUser,viewUser} from "../controllers/user.controller.js"
import authMiddlewares from "../middleware/authMiddlewares.js"
const userRouter=express.Router()

userRouter.post("/create",createUser)
userRouter.post("/login", loginUser)
userRouter.get("/view", authMiddlewares,viewUser)

export default userRouter;