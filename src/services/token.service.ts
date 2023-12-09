import jwt from 'jsonwebtoken'

import tokenController from '../db.services/single.table.db.service'

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

    async saveToken(userId: string | number, refreshToken: string) {
        const tokenData = await tokenController.getByField('tokens', 'user_id', userId)
        if (tokenData instanceof TypeError) return null
        if (tokenData[0]) {
            const updatedRow = await tokenController.update('tokens', 'user_id', {user_id: userId, refresh_token: refreshToken})
            return updatedRow
        }
        const token = await tokenController.create('tokens', [{user_id: userId, refresh_token: refreshToken}])
        return token
    }

    async removeToken(refreshToken: string) {
        const tokenData = await tokenController.delete('tokens', 'refresh_token', refreshToken)
        return tokenData
    }

    async findToken(refreshToken: string) {
        const tokenData = await tokenController.getByField('tokens', 'refresh_token', refreshToken)
        if (tokenData instanceof TypeError) return null
        return tokenData[0]
    }
}

export default new TokenService()