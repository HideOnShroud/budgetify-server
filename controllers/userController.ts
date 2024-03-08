import { User } from "../models/userModel"
import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import 'dotenv/config'


// create token
const createToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: '1h' })
}


// login user
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)

        res.cookie('jwt', token, { httpOnly: true })
        res.status(200).json({ email })
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }

}


// register user
const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await User.register(email, password)

        const token = createToken(user._id)

        res.cookie('jwt', token, { httpOnly: true })
        res.status(200).json({ email })
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }

}

export { loginUser, registerUser }