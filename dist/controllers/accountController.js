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
exports.updateAccount = exports.deleteAccount = exports.getAccount = exports.getAccounts = exports.createAccount = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const accountsModel_1 = __importDefault(require("../models/accountsModel"));
const getUserId = (req) => {
    return req.cookies.userId;
};
// create Account
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, currency, description, balance } = req.body;
    try {
        const account = yield accountsModel_1.default.createAccount(title, currency, description, balance, getUserId(req));
        res.cookie('accountId', account._id);
        res.cookie('cur', account.currency);
        res.status(200).json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createAccount = createAccount;
// get All Accounts
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = getUserId(req);
    try {
        const account = yield accountsModel_1.default.find({ userId }).sort({ createdAt: 1 });
        res.status(200).json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAccounts = getAccounts;
// get Account
const getAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Account" });
    }
    const account = yield accountsModel_1.default.findById(id);
    if (!account) {
        return res.status(404).json({ error: "No Such Account" });
    }
    res.cookie('accountId', account._id);
    res.cookie('cur', account.currency);
    res.status(200).json(account);
});
exports.getAccount = getAccount;
// delete Account
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Account" });
    }
    const account = yield accountsModel_1.default.findOneAndDelete({ _id: id });
    if (!account) {
        return res.status(404).json({ error: "No Such Account" });
    }
    res.status(200).json(account);
});
exports.deleteAccount = deleteAccount;
// edit Account
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Account" });
    }
    const account = yield accountsModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!account) {
        return res.status(404).json({ error: "No Such Account" });
    }
    res.status(200).json(account);
});
exports.updateAccount = updateAccount;
