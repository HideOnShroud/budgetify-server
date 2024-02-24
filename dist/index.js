"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
// import requireAuth from './middleware/requireAuth'
const secretKey = process.env.SECRET;
const port = 6969;
const MONGODB_URI = process.env.MONGO_DB;
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// routes
app.use('/api/user', users_1.default);
// db
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(27027, () => {
        console.log('Server is running on port: ' + port);
    });
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
app.get("/", (req, res) => {
    res.send("HELLOs");
});
app.listen(port, () => {
    console.log('TEST');
});
