import express, { Request, Response } from 'express'

import { AppDataSource } from '../data-source'
import { Products } from '../entity/Products'
import { ApiError } from '../exceptions/api.error'

const router = express.Router()


router.post('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const createdProduct = await AppDataSource.manager.create(Products, req.body)
        const savedProduct = await AppDataSource.manager.save(Products, createdProduct)
        res.json(savedProduct)
    } catch (error) {
        next(error as ApiError)
    }
})
router.get('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const allProducts = await AppDataSource.manager.find(Products)
        res.json(allProducts)
    } catch (error) {
        next(error as ApiError)
    }
})
router.get('/:id', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const oneProduct = await AppDataSource.manager.findOneBy(Products, {product_id: Number(req.params.id)})
        res.json(oneProduct)
    } catch (error) {
        next(error as ApiError)
    }
})
router.put('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const candidate = await AppDataSource.manager.findOneBy(Products, {product_id: req.body.product_id})

        if (candidate === null) {
            next(new ApiError(400, 'culdn`t find product in database'))
        }

        await AppDataSource.manager.merge(Products, candidate, req.body)
        const updatedProduct = await AppDataSource.manager.save(candidate)
        res.json(updatedProduct)
    } catch (error) {
        next(error as ApiError)
    }
})
router.delete('/:id', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const deletedProduct = await AppDataSource.manager.delete(Products, { product_id: Number(req.params.id) })
        res.json(deletedProduct)
    } catch (error) {
        next(error as ApiError)
    }
})

export default router