import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'
import dotenv from 'dotenv'
dotenv.config()
const secret = process.env.JWT_SECRET

export function getUserCurrentMiddleware (req, res, next) {
    const token = req.headers['accesstoken']
    if (!token) {
        return res.status(403).send({
            message: 'No token provided'
        })
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Token không hợp lệ.'
            })
        }
        req.uid = decoded.id
        next()
    })
}