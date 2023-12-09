import express from 'express'

// { Request, Response }

// import userController from '../db.services/single.table.db.service'

import adminUserRouter from './admin.user.routes'
import adminProductRouter from './admin.product.routes'
import adminOrdersRouter from './admin.orders.routes'

const router = express.Router()

router.use('/users', adminUserRouter)
router.use('/products', adminProductRouter)
router.use('/orders', adminOrdersRouter)

export default router