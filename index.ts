import 'dotenv/config'
import express, { Express, NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRouter from "./routes/users"
// import requireAuth from './middleware/requireAuth'


const secretKey = process.env.SECRET
const port = 6969
const MONGODB_URI = process.env.MONGO_DB
const app: Express = express()

// middleware
app.use(express.json());
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRouter)


// db
mongoose.connect(MONGODB_URI!)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(27027, () => {
            console.log('Server is running on port: ' + port);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });


app.get("/", (req: Request, res: Response) => {


    res.send("HELLOs")
})

app.listen(port, () => {
    console.log('TEST')
})


