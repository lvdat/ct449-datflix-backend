import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'
import md5 from 'md5'
import dotenv from 'dotenv'
dotenv.config()
const secret = process.env.JWT_SECRET

export async function login (req, res) {
    let { username, password } = req.body
    if (!username || !password) {
        return res.status(400).send({
        message: 'Vui lòng nhập đầy đủ username và mật khẩu'
        })
    }
    username = username.toLowerCase()
    const user = await User.findOne({ username }).exec()
    if (!user) {
        return res.status(404).send({
        message: 'Không tim thấy tài khoản!'
        })
    }
    if (!user.password || user.password !== md5(password)) {
        return res.status(401).send({
        message: 'Sai mật khẩu!'
        })
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' })
    return res.status(200).json({
        message: 'Đăng nhập thành công',
        username,
        x_access_token: token,
        avatar: user.avatar,
    })
}

export async function register (req, res) {
    let { username, password, email } = req.body
    if (!username || !password || !email) {
        return res.status(400).send({
        message: 'Vui lòng nhập đầy đủ username, mật khẩu và email'
        })
    }
    username = username.toLowerCase()
    try {
        const user = await User.create({
            username,
            email,
            password: md5(password)
        })
        if(!user) {
            return res.status(400).send({
                message: 'Có lỗi trong quá trình tạo tài khoản'
            })
        }
        // const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' })
        return res.status(200).json({
            message: 'Đăng ký tài khoản thành công! Bạn có thể đăng nhập bây giờ',
            // x_access_token: token,
        })
    } catch (error) {
        return res.status(400).send({
            message: 'Có lỗi trong quá trình tạo tài khoản',
            error: error.message
        })
    }
}

export async function getUserCurrent (req, res) {
    const uid = req.uid
    try {
        const user = await User.findById(uid).select('-password -__v').exec()
        if (!user) {
            return res.status(404).send({
                message: 'Không tim thấy tài khoản!'
            })
        }
        return res.status(200).send(user)
    } catch (err) {
        return res.status(500).send({
            message: 'Có lỗi trong quá trình lấy thông tin tài khoản',
            error: err.message
        })
    }
}

export async function getUserById (req, res) {
    if(req.params.id === '' || req.params.id === null) return res.status(400).send({ message: 'Vui lòng nhập id' })
    const uid = req.params.id
    try {
        const user = await User.findById(uid).select('-password -__v -email').exec()
        if (!user) {
            return res.status(404).send({
                message: 'Không tim thấy tài khoản!'
            })
        }
        return res.status(200).send(user)
    } catch (err) {
        return res.status(500).send({
            message: 'Có lỗi trong quá trình lấy thông tin tài khoản',
            error: err.message
        })
    }
}