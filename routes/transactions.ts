import express from "express";
import { createTransaction, deleteTransaction, getTransactions, getTransaction, updateTransaction } from "../controllers/transactionController";

const transactionRouter = express.Router()

// GET Transactions
transactionRouter.get('/', getTransactions)

// GET Transactions
transactionRouter.get('/:id', getTransaction)

// POST Transaction
transactionRouter.post('/', createTransaction)

// DELETE Transaction

transactionRouter.delete("/:id", deleteTransaction)

// UPDATE Transaction

transactionRouter.patch("/:id", updateTransaction)




export default transactionRouter