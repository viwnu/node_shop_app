import { Request, Response } from 'express'

import {ApiError} from '../exceptions/api.error'

export default function (err: Error | ApiError, req: Request, res: Response, next: () => void) {
    console.log(err)
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    if (err instanceof Error) {
        return res.status(400).json(err.message)
    }
    // return res.status(500).json({message: 'Непредвиденная ошибка'})
    next()
}