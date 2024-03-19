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
exports.updateTransaction = exports.deleteTransaction = exports.getTransaction = exports.getTransactions = exports.createTransaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const transactionsModel_1 = __importDefault(require("../models/transactionsModel"));
const getAccountId = (req) => {
    return req.cookies.accountId;
};
const getAccountCurrency = (req) => {
    return req.cookies.cur;
};
// create Transaction
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, type, category, amount, date, payee } = req.body;
    console.log("currency: " + getAccountCurrency(req) + " accound: " + getAccountId(req));
    try {
        const transaction = yield transactionsModel_1.default.createTransaction(title, description, type, category, amount, date, payee, getAccountCurrency(req), getAccountId(req));
        res.status(200).json(transaction);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createTransaction = createTransaction;
// get All Transactions
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("a id: ");
    const accountId = getAccountId(req);
    console.log("a id: ");
    try {
        const transaction = yield transactionsModel_1.default.find({ accountId }).sort({ createdAt: 1 });
        console.log("a id: ");
        res.status(200).json(transaction);
    }
    catch (error) {
        console.log("a id: ");
        res.status(400).json({ error: error });
    }
});
exports.getTransactions = getTransactions;
// get a Transaction
const getTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Transaction" });
    }
    const transaction = yield transactionsModel_1.default.findById(id);
    if (!transaction) {
        return res.status(404).json({ error: "No Such Transaction" });
    }
    res.status(200).json(transaction);
});
exports.getTransaction = getTransaction;
// delete Transaction
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Transaction" });
    }
    const transaction = yield transactionsModel_1.default.findOneAndDelete({ _id: id });
    if (!transaction) {
        return res.status(404).json({ error: "No Such Transaction" });
    }
    res.status(200).json(transaction);
});
exports.deleteTransaction = deleteTransaction;
// edit Transaction
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Transaction" });
    }
    const transaction = yield transactionsModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!transaction) {
        return res.status(404).json({ error: "No Such Transaction" });
    }
    res.status(200).json(transaction);
});
exports.updateTransaction = updateTransaction;
