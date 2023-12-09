import express, { Request, Response } from 'express'

import compositTablesController from '../db.services/composit.tables.service'

import { Product, customTablesNames } from '../types.ts/types'
import { ApiError } from '../exceptions/api.error'

const router = express.Router()

const orderTableNames: customTablesNames = {
    primaryTableName: 'orders',
    secondaryTableName: 'orders_details',
    primaryIDName: 'customer_id',
    secondaryIDName: 'order_id'
}

const cartsTableNames: customTablesNames = {
    primaryTableName: 'carts',
    secondaryTableName: 'carts_details',
    primaryIDName: 'customer_id',
    secondaryIDName: 'cart_id'
}

router.post('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const cartRows = await compositTablesController.get(cartsTableNames, req.body.user_id)
        await compositTablesController.delete(cartsTableNames, req.body.user_id)
        const orderRows = cartRows[0].map((row) => ({product_id: row.product_id, quantity: row.quantity}))
        const response = await compositTablesController.create<Product>(orderTableNames, req.body.user_id, orderRows)
        res.json(response)
    } catch (error) {
        next(error as ApiError)
    }
})
router.get('/', async (req: Request, res: Response) => {
    const response = await compositTablesController.get(orderTableNames, req.body.user_id)
    res.json(response instanceof TypeError ?response :response)
})

export default router