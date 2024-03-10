import express from "express";
import { loginUser, registerUser } from "../controllers/userController";

const userRouter = express.Router()

// login route
userRouter.post('/login', loginUser)


// register route
userRouter.post('/register', registerUser)

export default userRouter