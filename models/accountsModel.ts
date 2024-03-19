import mongoose, { Document, Model } from "mongoose"

interface AccountDocument extends Document {
    title: string
    currency: string
    description: string
    balance: string
    userId: string
}

interface AccountModel extends Model<AccountDocument> {
    createAccount(title: string, currency: string, description: string, balance: string, userId: string): Promise<AccountDocument>;
}

const Schema = mongoose.Schema

const accountSchema = new Schema<AccountDocument>({
    title: {
        type: String,
        required: true,
        unique: false
    },
    currency: {
        type: String,
        required: false,

    },
    description: {
        type: String,
        required: false
    },
    balance: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },

})

accountSchema.statics.createAccount = async function (title: string, currency: string, description: string, balance: string, userId: string): Promise<AccountDocument> {
    return await this.create({ title, currency, description, balance, userId })
}

const Account = mongoose.model<AccountDocument, AccountModel>("Account", accountSchema)

export default Account