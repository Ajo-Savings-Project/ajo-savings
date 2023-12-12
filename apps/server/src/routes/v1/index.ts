import { Router } from 'express'
import groupRoutes from './groups'
import userRoutes from './users'

const router = Router()

router.use('/users', userRoutes)
router.use('/groups', groupRoutes)

export default router
