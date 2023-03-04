import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: Number,
        default: 0
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
    }
})

export default mongoose.model('User', userSchema)