// import jwt from "jsonwebtoken"
// import 'dotenv/config'
// import User from "../models/userModel"
// import { NextFunction, Request, Response } from "express"

// const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
//     const { authorization } = req.headers
//     if (!authorization) {
//         return res.status(401).json({ error: "auth token req" })
//     }
//     const token = authorization.split(' ')[1]

//     try {
//         const { _id } = jwt.verify(token, process.env.SECRET!)

//         req.user = await User.findOne({ _id }).select('_id')
//         console.log("authorizesd")
//         next()

//     } catch (error) {
//         console.log(error)
//         res.status(401).json({ error: "req not auth" })
//     }

// }

// export default requireAuth

