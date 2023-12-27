import { Router } from 'express'
import { createUserTarget } from '../../controllers/savingsController'

const router = Router()

router.post('create', createUserTarget)
//router.get('getSavings', getAllUserTargets)

export default router
