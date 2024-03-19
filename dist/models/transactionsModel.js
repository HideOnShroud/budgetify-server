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
const transactionSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    payee: {
        type: String,
    },
    currency: {
        type: String,
        required: false,
    },
    accountId: {
        type: String,
        required: true
    },
});
transactionSchema.statics.createTransaction = function (title, description, type, category, amount, date, payee, currency, accountId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.create({ title, type, category, amount, date, description, payee, currency, accountId });
    });
};
const Transaction = mongoose_1.default.model("Transaction", transactionSchema);
exports.default = Transaction;
