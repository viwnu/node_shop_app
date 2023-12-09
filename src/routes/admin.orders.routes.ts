import express, { Request, Response } from 'express'

import compositTablesController from '../db.services/composit.tables.service'
import singleTablesController from '../db.services/single.table.db.service'

import { Product, customTablesNames } from '../types.ts/types'

const router = express.Router()

const tableNames: customTablesNames = {
    primaryTableName: 'orders',
    secondaryTableName: 'orders_details',
    primaryIDName: 'customer_id',
    secondaryIDName: 'order_id'
}

const byOrderTableNames = {...tableNames, primaryIDName: tableNames.secondaryIDName}

router.get('/user/:user_id', async (req: Request, res: Response) => {
    const response = await compositTablesController.get(tableNames, req.params.user_id)
    res.json(response)
})
router.get('/', async (req: Request, res: Response) => {
    const primaryRows = await singleTablesController.get(tableNames.primaryTableName)
    const response = await Promise.all(primaryRows.map(async (row) => (
        await singleTablesController.getByField(tableNames.secondaryTableName, tableNames.secondaryIDName, row.order_id)
    )))
    res.json(response)
})
router.put('/', async (req: Request, res: Response) => {
    const response = await compositTablesController.update<Product>(byOrderTableNames, req.body.order_id, req.body)
    res.json(response)
})
router.delete('/', async (req: Request, res: Response) => {
    const response = await compositTablesController.delete(byOrderTableNames, req.body.order_id)
    res.json(response)
})


export default router