import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default function (role: string = 'USER') {
    return function (req: Request, res: Response, next: () => void) {
        if (req.method === "OPTIONS") {
            next()
        }
    
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '')
            console.log(decodedData)
            if (typeof decodedData === 'string') return next()
            const hasRequiredRole = decodedData.user_role === role
            if (!hasRequiredRole) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            if(decodedData.user_role !== 'ADMIN') {
                req.body.user_id = decodedData.userId
                req.body.user_role = decodedData.user_role
            } else if(req.body.user_id === decodedData.userId) {
                return res.status(403).json({message: `Use "api/auth/update" instead`})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
}