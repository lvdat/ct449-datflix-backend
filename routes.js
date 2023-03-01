import express from 'express'
import { login, register, getUserById, getUserCurrent } from './controllers/user.controller.js'
import { getUserCurrentMiddleware } from './middleware/Token.js'
const router = express.Router()

router.post('/auth/login', login)
router.post('/auth/register', register)

router.get('/user/:id', getUserById)
router.get('/user', getUserCurrentMiddleware, getUserCurrent)

export default router