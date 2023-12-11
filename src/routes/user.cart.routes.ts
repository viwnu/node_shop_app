import express, { Request, Response } from 'express'

import { ApiError } from '../exceptions/api.error'
import cartService from '../services/cart.service'

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        res.json(await cartService.create(req.body))
    } catch (error) {
        next(error as ApiError)
    }
})
router.get('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        res.json(await cartService.get(req.body.user_id))
    } catch (error) {
        next(error as ApiError)
    }
})
router.put('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const updatedCart = await cartService.update(req.body.user_id, req.body.cart_details)
        res.json(updatedCart)
    } catch (error) {
        next(error as ApiError)
    }
})
router.delete('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const deletedCart = await cartService.delete(req.body.user_id)
        res.json(deletedCart)
    } catch (error) {
        next(error as ApiError)
    }
})

export default router