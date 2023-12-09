import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import userController from '../db.services/single.table.db.service'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const response = await userController.get('users')
    res.json(response)
})
router.get('/:id', async (req: Request, res: Response) => {
    const response = await userController.getByField('users', 'user_id', req.params.id)
    res.json(response instanceof TypeError ?response :response[0])
})
router.put('/', async (req: Request, res: Response) => {
    req.body.password = await bcrypt.hash(req.body.password, 3)
    const response = await userController.update('users', 'user_id', req.body)
    res.json(response)
})
router.delete('/', async (req: Request, res: Response) => {
    const response = await userController.delete('users', 'user_id', req.params.id)
    res.json(response)
})


export default router