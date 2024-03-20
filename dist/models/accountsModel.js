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
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const accountSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    balance: {
        type: String,
        required: false
    },
    currency: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
});
accountSchema.statics.createAccount = function (title, balance, currency, description, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.create({ title, balance, currency, description, userId });
    });
};
const Account = mongoose_1.default.model("Account", accountSchema);
exports.default = Account;
