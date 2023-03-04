import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
    role: String,
    permission: [String],
})

export default mongoose.model('Role', roleSchema)