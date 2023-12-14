import bcrypt from 'bcryptjs'

import tokenService from './token.service'
import {ApiError} from '../exceptions/api.error'
import { UserUpdateData } from '../types.ts/types'
import { AppDataSource } from '../data-source'
import { Users } from '../entity/Users'

class UserService {
    async registration(incomingValues: Users) {
        const {email, password} = incomingValues
        const candidate = await AppDataSource.manager.findOneBy(Users, {email})

        if (candidate !== null) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        
        const createdUser: Users = await AppDataSource.manager.create(Users, {...incomingValues, password: hashPassword})
        const savedUser = await AppDataSource.manager.save(Users, createdUser)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password: deletingPassword, ...resultUserData} = savedUser

        const tokens = tokenService.generateTokens({userId: savedUser.user_id, user_role: savedUser.user_role})
        await tokenService.saveToken(savedUser.user_id!, tokens.refreshToken)

        return {...tokens, ...resultUserData}
    }

    async login(email: string, password: string) {
        
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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password: deletingPassword, ...resultUserData} = user

        return {...tokens, ...resultUserData}
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
        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError()
        
        const user = await AppDataSource.manager.findOneBy(Users, {user_id: userData.userId})
        if(!user) throw new ApiError(400, 'cudln`t find user')

        const tokens = tokenService.generateTokens({userId: user.user_id, user_role: user.user_role})
        await tokenService.saveToken(user.user_id!, tokens.refreshToken)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password: deletingPassword, ...resultUserData} = user
        return {...tokens, ...resultUserData}
    }

    async update(incomingValues: UserUpdateData) {
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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password: deletingPassword, ...resultUserData} = updatedUser
        return {...tokens, ...resultUserData}
    }
}

export default new UserService()