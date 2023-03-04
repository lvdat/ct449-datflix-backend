import mongoose, { Schema } from 'mongoose'

const companySchema = new mongoose.Schema({
    name: String,
    logo_path: String,
    country: {
        type: Schema.Types.String,
        ref: 'Country'
    },

})

export default mongoose.model('Company', companySchema)