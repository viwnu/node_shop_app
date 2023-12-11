import express, { Request, Response } from 'express'

import userController from '../db.services/single.table.db.service'
import userCartRouter from './user.cart.routes'
import userOrdersRouter from './user.orders.routes'

const router = express.Router()

router.use('/cart', userCartRouter)
router.use('/orders', userOrdersRouter)

router.get('/', async (req: Request, res: Response) => {
    const response = await userController.getByField('users', 'user_id', req.body.user_id)
    res.json(response instanceof TypeError ?response :response[0])
})

export default router