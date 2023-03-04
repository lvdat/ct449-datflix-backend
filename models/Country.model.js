import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({
    iso_code: String,
    name: String,
})

export default mongoose.model('Country', countrySchema)