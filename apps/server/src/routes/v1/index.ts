import { Router } from 'express'
import groupRoutes from './groups'
import userRoutes from './users'
import oauthRoutes from './oauth'

const router = Router()

router.use('/users', userRoutes)
router.use('/groups', groupRoutes)
router.use('/oauth', oauthRoutes)

export default router
