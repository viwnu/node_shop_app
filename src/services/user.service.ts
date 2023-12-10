import bcrypt from 'bcryptjs'

import tokenService from './token.service'
import {ApiError} from '../exceptions/api.error'
import { UserData } from '../types.ts/types'
import { AppDataSource } from '../data-source'
import { Users } from '../entity/Users'

class UserService {
    async registration(incomingValues: UserData) {
        const {email, password} = incomingValues
        const candidate = await AppDataSource.manager.findOneBy(Users, {email})

        if (candidate !== null) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        
        const userData: Users = {
            firstName: incomingValues.firstname || null,
            surName: incomingValues.surname || null,
            lastName: incomingValues.lastname || null,
            email: incomingValues.email,
            password: hashPassword,
        }
        const createdUser = await AppDataSource.manager.create(Users, userData)
        const savedUser = await AppDataSource.manager.save(Users, createdUser)

        const tokens = tokenService.generateTokens({userId: savedUser.user_id, user_role: savedUser.user_role})
        await tokenService.saveToken(savedUser.user_id!, tokens.refreshToken)

        return {...tokens, ...{...savedUser, password: null}}
    }

    async login(email: string, password: string) {
        
        // const user = await AppDataSource.manager.find(Users)
        const user = await AppDataSource.manager.findOneBy(Users, {email})

        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const tokens = tokenService.generateTokens({userId: user.user_id, user_role: user.user_role})

        await tokenService.saveToken(user.user_id!, tokens.refreshToken)
        return {...tokens, ...{...user, password: null}}
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
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        if (typeof userData === 'string') throw new ApiError(400, 'userData is string')
        const user = await AppDataSource.manager.findOneBy(Users, {user_id: userData.userId})
        if(!user) throw new ApiError(400, 'cudln`t find user')

        const tokens = tokenService.generateTokens({userId: user.user_id, user_role: user.user_role})
        await tokenService.saveToken(user.user_id!, tokens.refreshToken)
        return {...tokens, ...{...user, password: null}}
    }

    async update(incomingValues: UserData) {
        const {email, password, newEmail, newPassword} = incomingValues
        
        const candidate = await AppDataSource.manager.findOneBy(Users, {email})
        if (!candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не существует`)
        }
        
        const isPassEquals = await bcrypt.compare(password, candidate.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }

        const hashPassword = await bcrypt.hash(newPassword || password, 3)

        await AppDataSource.manager.merge(Users, candidate, {
            ...candidate,
            email: newEmail,
            password: hashPassword
        })
        const updatedUser = await AppDataSource.manager.save(candidate)
        
        const tokens = tokenService.generateTokens({userId: updatedUser.user_id, user_role: updatedUser.user_role})
        await tokenService.saveToken(updatedUser.user_id!, tokens.refreshToken)

        return {...tokens, ...{...updatedUser, password: null}}
    }
}

export default new UserService()