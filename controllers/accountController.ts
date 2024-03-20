import mongoose from "mongoose"
import Account from "../models/accountsModel"
import { Request, Response } from "express"

const getUserId = (req: Request) => {

    return req.cookies.userId
}


// create Account

const createAccount = async (req: Request, res: Response) => {
    const { title, currency, description, balance } = req.body


    try {
        const account = await Account.createAccount(title, balance, currency, description, getUserId(req))
        res.cookie('accountId', account._id)
        res.cookie('cur', account.currency)
        res.status(200).json(account)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}


// get All Accounts

const getAccounts = async (req: Request, res: Response) => {
    const userId = getUserId(req)
    try {
        const account = await Account.find({ userId }).sort({ createdAt: 1 })
        res.status(200).json(account)

    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

// get Account

const getAccount = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Account" })
    }

    const account = await Account.findById(id)

    if (!account) {
        return res.status(404).json({ error: "No Such Account" })
    }
    res.cookie('accountId', account._id)
    res.cookie('cur', account.currency)
    res.status(200).json(account)

}

// delete Account

const deleteAccount = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Account" })
    }

    const account = await Account.findOneAndDelete({ _id: id })

    if (!account) {
        return res.status(404).json({ error: "No Such Account" })
    }
    res.status(200).json(account)
}



// edit Account

const updateAccount = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Account" })
    }

    const account = await Account.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!account) {
        return res.status(404).json({ error: "No Such Account" })
    }
    res.status(200).json(account)
}

export { createAccount, getAccounts, getAccount, deleteAccount, updateAccount }