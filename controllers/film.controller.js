// Film. categor API
import Film from '../models/Film.model'
import Category from '../models/Category.model'
import Country from '../models/Country.model'
import Company from '../models/Company.model'

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