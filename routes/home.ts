import express from "express";
import { createAccount, deleteAccount, getAccounts, getAccount, updateAccount } from "../controllers/accountController";

const homeRouter = express.Router()

// GET Accounts
homeRouter.get('/', getAccounts)

homeRouter.get('/:id', getAccount)

// POST Account
homeRouter.post('/', createAccount)

// DELETE Account

homeRouter.delete("/:id", deleteAccount)

// UPDATE Account

homeRouter.patch("/:id", updateAccount)




export default homeRouter