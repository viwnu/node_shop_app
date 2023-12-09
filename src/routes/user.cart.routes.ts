import express, { Request, Response } from 'express'

import compositTablesController from '../db.services/composit.tables.service'

import { Product, customTablesNames } from '../types.ts/types'

const router = express.Router()

const tableNames: customTablesNames = {
    primaryTableName: 'carts',
    secondaryTableName: 'carts_details',
    primaryIDName: 'customer_id',
    secondaryIDName: 'cart_id'
}

router.post('/', async (req: Request, res: Response) => {
    const response = await compositTablesController.create<Product>(tableNames, req.body.user_id, req.body)
    res.json(response)
})
router.get('/', async (req: Request, res: Response) => {
    const response = await compositTablesController.get(tableNames, req.body.user_id)
    res.json(response instanceof TypeError ?response :response)
})
router.put('/', async (req: Request, res: Response) => {
    const response = await compositTablesController.update<Product>(tableNames, req.body.user_id, req.body)
    res.json(response)
})
router.delete('/', async (req: Request, res: Response) => {
    const response = await compositTablesController.delete(tableNames, req.body.user_id)
    res.json(response)
})

export default router