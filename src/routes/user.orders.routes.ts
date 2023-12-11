import express, { Request, Response } from 'express'

import { ApiError } from '../exceptions/api.error'

import orderService from '../services/order.service'

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const response = await orderService.create(req.body.user_id)
        res.json(response)
    } catch (error) {
        next(error as ApiError)
    }
})
router.get('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const response = await orderService.getBy('user_id', req.body.user_id)
        res.json(response)
    } catch (error) {
        next(error as ApiError)
    }
})

export default router