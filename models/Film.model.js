import mongoose, { Schema } from 'mongoose'

const filmSchema = new mongoose.Schema({
    // some idea from TMDB
    bugget: String,
    homepage: String,
    imdb_id: String,
    overview: String,
    backdrop_path: String,
    poster_path: String,
    title: String,
    country: {
        type: Schema.Types.String,
        ref: 'Country',
    },
    release_date: String, // DD/MM/YYYY ??
    company: {
        type: Schema.Types.String,
        ref: 'Company',
    }
})

export default mongoose.model('Film', filmSchema)