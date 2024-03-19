import mongoose from "mongoose"
import Transaction from "../models/transactionsModel"
import { Request, Response } from "express"

const getAccountId = (req: Request) => {

    return req.cookies.accountId
}

const getAccountCurrency = (req: Request) => {
    return req.cookies.cur
}


// create Transaction

const createTransaction = async (req: Request, res: Response) => {
    const { title, description, type, category, amount, date, payee } = req.body
    console.log("currency: " + getAccountCurrency(req) + " accound: " + getAccountId(req))

    try {
        const transaction = await Transaction.createTransaction(title, description, type, category, amount, date, payee, getAccountCurrency(req), getAccountId(req))

        res.status(200).json(transaction)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

// get All Transactions

const getTransactions = async (req: Request, res: Response) => {
    console.log("a id: ")
    const accountId = getAccountId(req)
    console.log("a id: ")
    try {
        const transaction = await Transaction.find({ accountId }).sort({ createdAt: 1 })
        console.log("a id: ")

        res.status(200).json(transaction)

    } catch (error: any) {
        console.log("a id: ")
        res.status(400).json({ error: error })
    }
}

// get a Transaction

const getTransaction = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Transaction" })
    }

    const transaction = await Transaction.findById(id)

    if (!transaction) {
        return res.status(404).json({ error: "No Such Transaction" })
    }
    res.status(200).json(transaction)

}



// delete Transaction

const deleteTransaction = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Transaction" })
    }

    const transaction = await Transaction.findOneAndDelete({ _id: id })

    if (!transaction) {
        return res.status(404).json({ error: "No Such Transaction" })
    }
    res.status(200).json(transaction)
}



// edit Transaction

const updateTransaction = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Transaction" })
    }

    const transaction = await Transaction.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!transaction) {
        return res.status(404).json({ error: "No Such Transaction" })
    }
    res.status(200).json(transaction)
}

export { createTransaction, getTransactions, getTransaction, deleteTransaction, updateTransaction }