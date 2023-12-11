import express, { Request, Response } from 'express'

import { ApiError } from '../exceptions/api.error'
import orderService from '../services/order.service'

const router = express.Router()

router.get('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const response = await orderService.get()
        res.json(response)
    } catch (error) {
        next(error as ApiError)
    }
})

router.get('/user/:user_id', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const response = await orderService.getBy('user_id', Number(req.params.user_id))
        res.json(response)
    } catch (error) {
        next(error as ApiError)
    }
})

router.put('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const response = await orderService.update(req.body.order_id, req.body.order_details)
        res.json(response)
    } catch (error) {
        next(error as ApiError)
    }
})

router.delete('/:order_id', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const response = await orderService.delete(Number(req.params.order_id))
        res.json(response)
    } catch (error) {
        next(error as ApiError)
    }
})


export default router