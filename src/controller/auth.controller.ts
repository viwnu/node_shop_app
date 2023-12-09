import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import {ApiError} from '../exceptions/api.error'

import userService from '../services/user.service'

class authController {
    async registration(req: Request, res: Response, next: (arg0: ApiError) => void) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const userData = await userService.registration(req.body)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: (arg0: ApiError) => void) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: (arg0: ApiError) => void) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: (arg0: ApiError) => void) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            next(e)
        }
    }

    async update(req: Request, res: Response, next: (arg0: ApiError) => void) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const userData = await userService.update(req.body)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            next(e)
        }
    }

}

export default new authController()
