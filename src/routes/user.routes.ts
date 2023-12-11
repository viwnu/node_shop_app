import express, { Request, Response } from 'express'

import userCartRouter from './user.cart.routes'
import userOrdersRouter from './user.orders.routes'
import { AppDataSource } from '../data-source'
import { Users } from '../entity/Users'
import { ApiError } from '../exceptions/api.error'

const router = express.Router()

router.use('/cart', userCartRouter)
router.use('/orders', userOrdersRouter)

router.get('/:id', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {

    try {
        const users = await AppDataSource.manager.findOneBy(Users, {user_id: Number(req.params.id)})
        res.json(users)
    } catch (error) {
        next(error as ApiError)
    }
})

export default router