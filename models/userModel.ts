import mongoose, { Model, Document } from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"

interface UserDocument extends Document {
    email: string;
    password: string;
}

interface UserModel extends Model<UserDocument> {
    register(email: string, password: string): Promise<UserDocument>;
    login(email: string, password: string): Promise<UserDocument>;
}

const Schema = mongoose.Schema

const userSchema = new Schema<UserDocument, UserModel>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

// register static method

userSchema.statics.register = async function (email: string, password: string): Promise<UserDocument> {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("email is used")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user

}

// register static method

userSchema.statics.login = async function (email: string, password: string): Promise<UserDocument> {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error("user not found")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("incorect password")
    }

    return user

}


const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;