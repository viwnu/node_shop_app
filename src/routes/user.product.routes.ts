import express, { Request, Response } from 'express'

import productController from '../db.services/single.table.db.service'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const response = await productController.get('products')
    res.json(response)
})
router.get('/:id', async (req: Request, res: Response) => {
    const response = await productController.getByField('products', 'product_id', req.params.id)
    res.json(response instanceof TypeError ?response :response[0])
})

export default router