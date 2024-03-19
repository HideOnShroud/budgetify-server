"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const transactionRouter = express_1.default.Router();
// GET Transactions
transactionRouter.get('/', transactionController_1.getTransactions);
// GET Transactions
transactionRouter.get('/:id', transactionController_1.getTransaction);
// POST Transaction
transactionRouter.post('/', transactionController_1.createTransaction);
// DELETE Transaction
transactionRouter.delete("/:id", transactionController_1.deleteTransaction);
// UPDATE Transaction
transactionRouter.patch("/:id", transactionController_1.updateTransaction);
exports.default = transactionRouter;
