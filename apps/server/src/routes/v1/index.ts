import { Router } from 'express'
import groupRoutes from './groups'
import userRoutes from './users'
import oauthRoutes from './oauth'
import paymentRoutes from './payments'
import savingsRoutes from './savings'

const router = Router()

router.use('/users', userRoutes)
router.use('/groups', groupRoutes)
router.use('/oauth', oauthRoutes)
router.use('/payments', paymentRoutes)
router.use('/savings', savingsRoutes)

export default router
