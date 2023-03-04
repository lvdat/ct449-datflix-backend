// Film. categor API
import Film from '../models/Film.model.js'
import Category from '../models/Category.model.js'
import Country from '../models/Country.model.js'
import Company from '../models/Company.model.js'

export async function getDetailsMovie(req, res) {
    let { id } = req.params.id
    try {
        const movie = await Film.findById(id).exec()
        if(!movie) {
            return res.status(404).send({
                message: "Không tìm thấy phim với ID này"
            })
        }
        return res.status(200).send(movie)
    } catch (err) {
        return res.status(500).send({
            message: "Có lỗi trong quá trình truy xuất thông tin phim",
            error: err.message
        })
    }
}

export async function addMovie(req, res) {
    let { bugget, homepage, imdb_id, overview, backdrop_path, poster_path, title, country, release_date, company } = req.body
    let newMoview = {
        bugget, homepage, imdb_id, overview, backdrop_path, poster_path, title, release_date,
    }
    try {
        const movie = await Film.create({
            newMoview,
            ...(country ? await Country.findOne({iso_code: country}) : null),
            ...(company ? await Company.findById(company) : null),
        })
        if(!movie) {
            return res.status(400).send({
                message: "Không thể thêm phim mới, vui lòng kiểm tra lại thông tin đã gửi"
            })
        }
    } catch (err) {
        return res.status(500).send({
            message: "Có lỗi trong quá trình thêm phim mới",
            error: err.message,
        })
    }
    
}