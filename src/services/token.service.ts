import jwt from 'jsonwebtoken'

import { AppDataSource } from '../data-source'
import { Tokens } from '../entity/Tokens'

class TokenService {
    generateTokens(payload: string | object) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '', {expiresIn: '30m'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '')
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || '')
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const candidate = await AppDataSource.manager.findOneBy(Tokens, {user_id: userId})

        if (candidate !== null) {
            await AppDataSource.manager.merge(Tokens, candidate, {refresh_token: refreshToken})
            const updatedToken = await AppDataSource.manager.save(candidate)
            return updatedToken
        }

        const createdToken = await AppDataSource.manager.create(Tokens, {user_id: userId, refresh_token: refreshToken})
        const savedToken = await AppDataSource.manager.save(Tokens, createdToken)
        return savedToken
    }

    async removeToken(refreshToken: string) {
        return await AppDataSource.manager.delete(Tokens, { refresh_token: refreshToken })
    }

    async findToken(refreshToken: string) {
        const token = await AppDataSource.manager.findOneBy(Tokens, { refresh_token: refreshToken })
        return token
    }
}

export default new TokenService()