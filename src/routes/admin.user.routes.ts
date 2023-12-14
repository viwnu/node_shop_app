import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import { AppDataSource } from '../data-source'
import { Users } from '../entity/Users'
import { ApiError } from '../exceptions/api.error'


const router = express.Router()

router.get('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const users = await AppDataSource.manager.find(Users)
        res.json(users)
    } catch (error) {
        next(error as ApiError)
    }
    
})
router.get('/:id', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const users = await AppDataSource.manager.findOneBy(Users, {user_id: Number(req.params.id)})
        res.json(users)
    } catch (error) {
        next(error as ApiError)
    }
})
router.put('/', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const candidate = await AppDataSource.manager.findOneBy(Users, {user_id: Number(req.body.user_id)})

        if (candidate === null) {
            next(new ApiError(400, 'culdn`t find user in database'))
        }
        if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 3)
        await AppDataSource.manager.merge(Users, candidate, req.body)
        const updatedUser = await AppDataSource.manager.save(candidate)
        res.json(updatedUser)

    } catch (error) {
        next(error as ApiError)
    }
})
router.delete('/:user_id', async (req: Request, res: Response, next: (arg0: ApiError) => void) => {
    try {
        const deletedUser = await AppDataSource.manager.delete(Users, { user_id: Number(req.params.user_id) })
        res.json(deletedUser)
    } catch (error) {
        next(error as ApiError)
    }
})


export default router