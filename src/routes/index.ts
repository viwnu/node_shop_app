import express from 'express'

import authMiddleware from '../middlewares/auth.middleware'

import authRouter from './auth.router'
import userRouter from './user.routes'
import adminRouter from './admin.routes'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', authMiddleware(), userRouter)
router.use('/admin', authMiddleware("ADMIN"), adminRouter)

export default router