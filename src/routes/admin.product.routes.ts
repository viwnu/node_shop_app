import express, { Request, Response } from 'express'

import productController from '../db.services/single.table.db.service'

const router = express.Router()


router.post('/', async (req: Request, res: Response) => {
    const response = await productController.create('products', req.body)
    res.json(response)
})
router.get('/', async (req: Request, res: Response) => {
    const response = await productController.get('products')
    res.json(response)
})
router.get('/:id', async (req: Request, res: Response) => {
    const response = await productController.getByField('products', 'product_id', req.params.id)
    res.json(response instanceof TypeError ?response :response[0])
})
router.put('/', async (req: Request, res: Response) => {
    const response = await productController.update('products', 'product_id', req.body)
    res.json(response)
})
router.delete('/:id', async (req: Request, res: Response) => {
    const response = await productController.delete('products', 'product_id', req.params.id)
    res.json(response)
})

export default router