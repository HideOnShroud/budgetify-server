import mongoose, { Document, Model } from "mongoose"

interface TransactionDocument extends Document {
    title: string
    description: string
    type: string
    category: string
    amount: string
    date: string
    payee: string
    currency: string
    accountId: string
}

interface TransactionModel extends Model<TransactionDocument> {
    createTransaction(title: string, description: string, type: string,
        category: string,
        amount: string,
        date: string,
        payee: string, currency: string, accountId: string): Promise<TransactionDocument>;
}

const Schema = mongoose.Schema

const transactionSchema = new Schema<TransactionDocument>({
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

})

transactionSchema.statics.createTransaction = async function (title: string, description: string, type: string,
    category: string,
    amount: string,
    date: string,
    payee: string, currency: string, accountId: string): Promise<TransactionDocument> {
    return await this.create({ title, type, category, amount, date, description, payee, currency, accountId })
}

const Transaction = mongoose.model<TransactionDocument, TransactionModel>("Transaction", transactionSchema)

export default Transaction