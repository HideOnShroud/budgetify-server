"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const userModel_1 = __importDefault(require("../models/userModel"));
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ error: "auth token req" });
    }
    try {
        const verifiedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        const userId = verifiedToken._id;
        const user = yield userModel_1.default.findOne({ _id: userId }).select('_id');
        console.log("authorizesd");
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "req not auth" });
    }
});
exports.default = requireAuth;
