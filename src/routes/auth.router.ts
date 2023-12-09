import express from 'express'
import { body } from 'express-validator'

import controller from '../controller/auth.controller'

const router = express.Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    controller.registration
)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.get('/refresh', controller.refresh)
router.put('/update',
    body('newEmail').optional().isEmail(),
    body('newPassword').optional().isLength({min: 3, max: 32}),
    controller.update
)

export default router