import { Router } from 'express'
import { createTarget } from '../../controllers/targetControllers/createTargets'
import { getTargets } from '../../controllers/targetControllers/getTargets'
import { authorizationMiddleware } from '../../middleware/authorization/authentication'

const router = Router()

router.post('/createTarget', authorizationMiddleware, createTarget)

router.get('/getTargets', authorizationMiddleware, getTargets)
router.get('/getTarget/:targetId', authorizationMiddleware, getTargets)

export default router
