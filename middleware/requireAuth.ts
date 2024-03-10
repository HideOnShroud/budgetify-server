import jwt, { JwtPayload } from "jsonwebtoken"
import 'dotenv/config'
import { User } from "../models/userModel"
import { NextFunction, Request, Response } from "express"

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(401).json({ error: "auth token req" })
    }


    try {

        const verifiedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload
        const userId = verifiedToken._id

        const user = await User.findOne({ _id: userId }).select('_id')
        console.log("authorizesd")
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "req not auth" })
    }

}

export default requireAuth

