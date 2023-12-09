import bcrypt from 'bcryptjs'

import tokenService from './token.service'
import userController from '../db.services/single.table.db.service'
import {ApiError} from '../exceptions/api.error'
import { UserData } from '../types.ts/types'

class UserService {
    async registration(incomingValues: UserData) {
        const {email, password} = incomingValues
        const candidate = await userController.getByField('users', 'email', email)
        if (candidate.length) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)

        const user = await userController.create('users', [{...incomingValues, password: hashPassword, user_role: 'USER'}])
        
        const tokens = tokenService.generateTokens({userId: user[0].user_id, user_role: user[0].user_role})
        await tokenService.saveToken(user[0].user_id, tokens.refreshToken)

        return {...tokens, ...user[0]}
    }

    async login(email: string, password: string) {
        const user = await userController.getByField('users', 'email', email)
        
        if (!user[0]) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user[0].password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const tokens = tokenService.generateTokens({userId: user[0].user_id, user_role: user[0].user_role})

        await tokenService.saveToken(user[0].user_id, tokens.refreshToken)
        return {...tokens, ...user[0]}
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        console.log('userData', userData)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        if (typeof userData === 'string') return new ApiError(400, 'userData is string')
        const user = await userController.getByField('users', 'user_id', userData.userId)
        console.log(user)
        const tokens = tokenService.generateTokens({userId: user[0].user_id, user_role: user[0].user_role})

        await tokenService.saveToken(user[0].user_id, tokens.refreshToken)
        return {...tokens, ...user[0]}
    }

    async update(incomingValues: UserData) {
        const {email, password, newEmail, newPassword} = incomingValues
        
        const user = await userController.getByField('users', 'email', email)
        if (!user.length) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не существует`)
        }
        
        const isPassEquals = await bcrypt.compare(password, user[0].password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }

        const hashPassword = await bcrypt.hash(newPassword || password, 3)

        const udatedUserData = await userController.update('users', 'user_id', {
            user_id: user[0].user_id,
            firstname: incomingValues.firstname,
            surname: incomingValues.surname,
            lastname: incomingValues.lastname,
            user_role: user[0].user_role,
            password: hashPassword,
            email: newEmail || email
        })
        
        const tokens = tokenService.generateTokens({userId: udatedUserData.user_id, user_role: udatedUserData.user_role})
        await tokenService.saveToken(udatedUserData.user_id, tokens.refreshToken)

        return {...tokens, ...udatedUserData}
    }
}

export default new UserService()