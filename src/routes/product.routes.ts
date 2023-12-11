import express, { Request, Response } from 'express'

import { AppDataSource } from '../data-source'
import { Products } from '../entity/Products'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const allProducts = await AppDataSource.manager.find(Products)
    res.json(allProducts)
})
router.get('/:id', async (req: Request, res: Response) => {
    const oneProduct = await AppDataSource.manager.findOneBy(Products, {product_id: Number(req.params.id)})
    res.json(oneProduct)
})

export default router