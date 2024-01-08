import { Router } from 'express'
import groupRoutes from './groups'
import userRoutes from './users'
import getTotalIncome from './chart'
const router = Router()

router.use('/users', userRoutes)
router.use('/groups', groupRoutes)
router.use('/chart', getTotalIncome)

export default router
