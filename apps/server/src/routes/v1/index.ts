import { Router } from 'express'
import groupRoutes from './groups'
import userRoutes from './users'
import paymentRoutes from './payments'

const router = Router()

router.use('/users', userRoutes)
router.use('/groups', groupRoutes)
router.use('/payments', paymentRoutes)

export default router
